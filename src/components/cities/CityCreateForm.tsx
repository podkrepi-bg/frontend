import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Container, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { createCity } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { CityResponse, CityFormData, CityInput } from 'gql/cities'
import Layout from './layout/Layout'

const validationSchema: yup.SchemaOf<CityFormData> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(25).required(),
    postalCode: yup.number().max(25).required(),
  })

const defaults: CityFormData = {
  name: '',
  postalCode: 0,
}

export type CityFormProps = { initialValues?: CityFormData }

export default function CityForm({ initialValues = defaults }: CityFormProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, CityInput>({
    mutationFn: createCity,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: CityFormData,
    { setFieldError, resetForm }: FormikHelpers<CityFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        name: values.name,
        postalCode: values.postalCode,
      })
      resetForm()
      router.push(routes.cities.home)
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
    <>
      <Layout />
      <Container maxWidth="sm">
        <Grid container direction="column" component="section">
          <Typography variant="h3">Create new City</Typography>
          <Grid item xs={12}></Grid>
          <GenericForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="Cities:City.name"
                  name="name"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="Citys:City.postalCode"
                  name="postalCode"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton fullWidth label="Създай нов град" loading={mutation.isLoading} />
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </>
  )
}
