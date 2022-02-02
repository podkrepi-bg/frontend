import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Container, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { createBootcamp } from 'common/rest'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { BootcampResponse, BootcampFormData, BootcampInput } from 'gql/bootcamps'
import Layout from './layout/Layout'

const validationSchema: yup.SchemaOf<BootcampFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(3).max(25).required(),
    lastName: yup.string().trim().min(3).max(25).required(),
  })

const defaults: BootcampFormData = {
  firstName: '',
  lastName: '',
}

export type BootcampFormProps = { initialValues?: BootcampFormData }

export default function BootcampForm({ initialValues = defaults }: BootcampFormProps) {
  const { t } = useTranslation()
  const router = useRouter()

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampInput
  >({
    mutationFn: createBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcampFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcampFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        firstName: values.firstName,
        lastName: values.lastName,
      })
      resetForm()
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
    <>
      <Layout></Layout>
      <Container maxWidth="sm">
        <Grid container direction="column" component="section">
          <Typography variant="h3">Create new Bootcamp</Typography>
          <Grid item xs={12}></Grid>
          <GenericForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="bootcamps:bootcamp.firstName"
                  name="firstName"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="bootcamps:bootcamp.lastName"
                  name="lastName"
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <SubmitButton fullWidth label="Създай нов" loading={mutation.isLoading} />
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </>
  )
}
