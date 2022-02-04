/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Container, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { editBootcamp } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampFormData, BootcampResponse, EditBootcampProp } from 'gql/bootcamps'

import Layout from './layout/Layout'

export default function EditBootcamp(props: any) {
  const router = useRouter()
  const values = props.values
  const { t } = useTranslation()

  const defaults = {
    firstName: values.firstName,
    lastName: values.lastName,
  }

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    EditBootcampProp
  >({
    mutationFn: editBootcamp,
    onError: () => AlertStore.show(t('bootcamp:alerts.edit-row.error'), 'error'),
    onSuccess: () => AlertStore.show(t('bootcamp:alerts.edit-row.success'), 'success'),
  })

  const onSubmit = async (
    values: BootcampFormData,
    { setFieldError }: FormikHelpers<BootcampFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
        id: router.query.id,
      })
      router.push(routes.bootcamps.home)
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
    <Container maxWidth="sm">
      <Layout />
      <Grid container direction="column" component="section">
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
            Edit Bootcamp
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
                defaultValue={defaults.firstName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                label="Last name"
                name="lastName"
                autoComplete="name"
                defaultValue={defaults.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton fullWidth label="Запази" loading={mutation.isLoading} />
              <Button fullWidth onClick={() => router.push(routes.bootcamps.home)}>
                Откажи
              </Button>
            </Grid>
          </Grid>
        </GenericForm>
      </Grid>
    </Container>
  )
}
