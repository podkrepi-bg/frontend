
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
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
import BootcampersLayout from '../layout/Layout'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'
import { BootcampFormData, BootcampInput, BootcampResponse, EditBootcampProp } from 'gql/bootcamps'
import { useViewBootcamp } from 'common/hooks/bootcamps'

const defaults: BootcampFormData = {
  firstName: '',
  lastName: '',
}

type BootcampFormProps = {
  id: string
  initialValues?: BootcampFormData
}

type editBootcamp = {
  id: string
  data: BootcampInput
}

export default function EditBootcamp({ id, initialValues = defaults }: BootcampFormProps) {
  const router = useRouter()
  const info = useViewBootcamp(id)

  const { t } = useTranslation()

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
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
      }
      await mutation.mutateAsync({
        id,
        data,
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
    <>
      <Layout></Layout>
      <Container maxWidth="sm">
        <Grid container direction="column" component="section">
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" sx={{ textAlign: 'center' }}>
              Edit Bootcamp
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
                  value={initialValues.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <ButtonGroup sx={{textAlign: "center"}} >
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
