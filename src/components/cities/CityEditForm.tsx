/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Container, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { editCity } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { CityFormData, CityResponse, EditCityProp } from 'gql/cities'

import Layout from './layout/Layout'

export default function EditCity(props: any) {
  const router = useRouter()
  const values = props.values
  const { t } = useTranslation()

  const defaults = {
    name: values.name,
    postalCode: values.postalCode,
  }

  const mutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, EditCityProp>({
    mutationFn: editCity,
    onError: () => AlertStore.show(t('City:alerts.edit-row.error'), 'error'),
    onSuccess: () => AlertStore.show(t('City:alerts.edit-row.success'), 'success'),
  })

  const onSubmit = async (values: CityFormData, { setFieldError }: FormikHelpers<CityFormData>) => {
    try {
      await mutation.mutateAsync({
        data: {
          name: values.name,
          postalCode: values.postalCode,
        },
        id: `${router.query.id}`,
      })
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
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              Edit City
            </Typography>
          </Grid>
          <GenericForm onSubmit={onSubmit} initialValues={defaults}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="First name"
                  name="firstName"
                  autoComplete="name"
                  defaultValue={defaults.name}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="Last name"
                  name="lastName"
                  autoComplete="name"
                  defaultValue={defaults.postalCode}
                />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton fullWidth label="Запази" loading={mutation.isLoading} />
                <Button fullWidth onClick={() => router.push(routes.cities.home)}>
                  Откажи
                </Button>
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </>
  )
}
