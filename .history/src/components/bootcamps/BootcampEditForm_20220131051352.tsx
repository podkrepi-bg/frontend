
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError } from 'axios'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { editBootcamp } from 'common/rest'
import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material'
import Layout from './layout/Layout'
import { routes } from 'common/routes'
import React from 'react'
import * as yup from 'yup'


import { BootcamperFormData, BootcamperInput, BootcampersResponse } from 'gql/bootcamp'
import { editBootcamper } from 'common/rest'


import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import BootcampersLayout from '../layout/Layout'
import { ApiErrors, isAxiosError, matchValidator } from 'common/api-errors'
import { useViewBootcamper } from 'common/hooks/bootcamp'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { BootcampFormData, BootcampInput, BootcampResponse } from 'gql/bootcamps'

const defaults: BootcampFormData = {
  firstName: '',
  lastName: '',
}

export type BootcamperFormProps = { initialValues?: BootcamperFormData }

export default function EditBootcamper({ initialValues = defaults }: BootcamperFormProps) {
  const router = useRouter()
  const id = window.location.pathname.split('/')[3]

  const info = useViewBootcamper(id)

  if (!info.isLoading) {
    initialValues.firstName = info.data?.firstName || ''
    initialValues.lastName = info.data?.lastName || ''
  }

  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampInput
  >({
    mutationFn: editBootcamp,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: BootcamperFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcamperFormData>,
  ) => {
    try {
      const response = await axios.put(endpoints.bootcamp.viewBootcamp(id).url, values)
      resetForm()
      router.push('/bootcamp')
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
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              Edit
            </Typography>
          </Grid>
          <GenericForm onSubmit={onSubmit} initialValues={initialValues}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="First name"
                  name="firstName"
                  autoComplete="name"
                  defaultValue={initialValues.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormTextField
                  type="text"
                  label="Last name"
                  name="lastName"
                  autoComplete="name"
                  defaultValue={initialValues.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup>
                  <SubmitButton
                    fullWidth
                    label="campaigns:cta.submit"
                    loading={mutation.isLoading}
                  />
                  <Button onClick={() => router.push(routes.bootcamps.home)}>Cancel</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </GenericForm>
        </Grid>
      </Container>
    </>
  )
}
