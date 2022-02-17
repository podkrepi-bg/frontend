import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Container, Grid, InputLabel, MenuItem, Select } from '@mui/material'

import { routes } from 'common/routes'
import { createCity, editCity } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { CityResponse, CityFormData, CityInput, CityFormProps, EditCityProp } from 'gql/cities'
import { useCountriesList } from 'common/hooks/cities'

const validationSchema: yup.SchemaOf<CityFormData> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(25).required(),
    postalCode: yup.string().trim().min(1).max(10).required(),
    countryId: yup.string().trim().required(),
  })

const defaults: CityFormData = {
  name: '',
  postalCode: '',
  countryId: '0',
}

export default function CityForm({ initialValues = defaults, id }: CityFormProps) {
  const countries = useCountriesList()
  const [countryId, setCountryId] = useState('')
  const { t } = useTranslation()
  const router = useRouter()

  const createMutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, CityInput>(
    {
      mutationFn: createCity,
      onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
      onSuccess: () => AlertStore.show(t('Градът беше създаден успешно.'), 'success'),
    },
  )

  const editMutation = useMutation<
    AxiosResponse<CityResponse>,
    AxiosError<ApiErrors>,
    EditCityProp
  >({
    mutationFn: editCity,
    onError: () => AlertStore.show(t('Всички полета са задължителни'), 'error'),
    onSuccess: () => AlertStore.show(t('Градът беше променен успешно.'), 'success'),
  })

  const onSubmit = async (
    values: CityInput,
    { setFieldError, resetForm }: FormikHelpers<CityInput>,
  ) => {
    try {
      if (id) {
        try {
          await editMutation.mutateAsync({
            id: String(router.query.id),
            data: {
              name: values.name,
              postalCode: values.postalCode,
              countryId: countryId,
            },
          })
          router.push(routes.cities.home)
        } catch (err) {
          console.log(err)
        }
      } else {
        await createMutation.mutateAsync({
          name: values.name,
          postalCode: values.postalCode,
          countryId: countryId,
        })
        resetForm()
        router.push(routes.cities.home)
      }
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

  function handleChange(event: any) {
    setCountryId(event.target.value)
  }

  return (
    <Container sx={{ pt: '24px' }} disableGutters maxWidth="sm">
      <Grid container direction="column" component="section">
        <Grid item xs={12}></Grid>
        <GenericForm
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormTextField type="text" label="Cities: Име" name="name" autoComplete="title" />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="number"
                label="Cities:Пощенски код"
                name="postalCode"
                autoComplete="postal-code"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Държава</InputLabel>
              <Select
                id="countryId"
                name="countryId"
                // value= {setCountryId(countryId)}
                onChange={handleChange}>
                {countries?.map((country) => {
                  return (
                    <MenuItem key={country.id} value={country.id}>
                      {country.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </Grid>

            {id ? (
              <Grid item xs={12}>
                <SubmitButton fullWidth label="Запази" loading={editMutation.isLoading} />
              </Grid>
            ) : (
              <Grid item xs={12}>
                <SubmitButton fullWidth label="Създай" loading={createMutation.isLoading} />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button fullWidth onClick={() => router.push(routes.cities.home)}>
                Откажи
              </Button>
            </Grid>
          </Grid>
        </GenericForm>
      </Grid>
    </Container>
  )
}
