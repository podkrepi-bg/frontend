import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { Button, Grid } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import { useCreateCountry, useEditCountry } from 'service/country'
import { CountryInput, CountryResponse } from 'gql/countries'
import { name } from 'common/form/validation'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import LinkButton from 'components/common/LinkButton'

const validationSchema: yup.SchemaOf<CountryInput> = yup.object().defined().shape({
  name: name.required(),
  countryCode: name.required(),
})

const defaults: CountryInput = {
  name: '',
  countryCode: '',
}

type CountryFormProps = {
  initialValues?: CountryInput
  id?: string
}

type CountryEditInput = {
  id: string
  data: CountryInput
}

export default function CountryForm({ initialValues = defaults, id }: CountryFormProps) {
  //if (id) -> edit form, else -> create form
  const { t } = useTranslation('countries')

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map((el) => handleUniqueViolation(el.constraints, t))
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('alerts.new-row.error'), 'error')
  }

  const createMutation = useMutation<
    AxiosResponse<CountryResponse>,
    AxiosError<ApiErrors>,
    CountryInput
  >({
    mutationFn: useCreateCountry(),
    onError: (error) => handleError(error),
    onSuccess: () => AlertStore.show(t('alerts.new-row.success'), 'success'),
  })

  const editMutation = useMutation<
    AxiosResponse<CountryResponse>,
    AxiosError<ApiErrors>,
    CountryEditInput
  >({
    mutationFn: useEditCountry(),
    onError: () => AlertStore.show(t('alerts.edit-row.error'), 'error'),
    onSuccess: () => AlertStore.show(t('alerts.edit-row.success'), 'success'),
  })
  const router = useRouter()

  const onSubmit = async (
    values: CountryInput,
    { setFieldError, resetForm }: FormikHelpers<CountryInput>,
  ) => {
    try {
      const data = {
        name: values.name,
        countryCode: values.countryCode.toLocaleUpperCase(),
      }
      if (id) {
        await editMutation.mutateAsync({ id, data })
      } else {
        await createMutation.mutateAsync(data)
        resetForm()
      }
      router.push(routes.admin.countries.index)
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid
      container
      direction="column"
      component="section"
      sx={{
        maxWidth: '700px',
        margin: '80px auto 0 auto',
      }}>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <FormTextField
              type="text"
              label="countries:fields.name"
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormTextField
              type="text"
              label="countries:fields.country-code"
              name="countryCode"
              autoComplete="country-code"
            />
          </Grid>
          {id ? (
            <>
              <Grid item xs={6}>
                <Button fullWidth variant="contained" type="submit" color="secondary">
                  {t('btns.save')}
                </Button>
              </Grid>
            </>
          ) : (
            <Grid item xs={6}>
              <SubmitButton fullWidth label="countries:btns.add" />
            </Grid>
          )}
          <Grid item xs={6}>
            <LinkButton
              fullWidth
              variant="contained"
              color="primary"
              href={routes.admin.countries.index}>
              {t('btns.cancel')}
            </LinkButton>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
