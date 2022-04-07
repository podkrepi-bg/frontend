import React from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from 'react-query'
import { Grid, Box, Typography, Link, Button } from '@mui/material'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { makeStyles } from '@mui/styles'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { BootcampResponse, BootcampTypeFormData } from 'gql/bootcamp'
import { editBootcamp } from 'service/bootcamp'

const useStyles = makeStyles({
  container: {
    maxWidth: '700px',
    margin: '0 auto',
  },
})

const validationSchema = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().required().min(4),
    lastName: yup.string().required().min(4),
    city: yup.string().required().min(5),
  })

const defaults = {
  firstName: '',
  lastName: '',
  city: '',
}

type BootcampFormProps = {
  id: string
  initialValues: BootcampTypeFormData
}

export default function EditBootcampForm({ id, initialValues }: BootcampFormProps) {
  const { t } = useTranslation()

  const classes = useStyles()
  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampFormProps
  >({
    mutationFn: editBootcamp,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('alerts.create'), 'success'),
  })

  const router = useRouter()

  const onSubmit = async (
    values: BootcampTypeFormData,
    { setFieldError, resetForm }: FormikHelpers<BootcampTypeFormData>,
  ) => {
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        city: values.city,
      }
      console.log(data)

      await mutation.mutateAsync({ id, data })
      resetForm()
      router.push(routes.bootcamp.index)
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }
  return (
    <Grid container direction="column" component="section" className={classes.container}>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6">{t('bootcamp:forms:edit-heading')}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label={t('bootcamp:grid:first-name')}
                name="firstName"
                autoComplete="firstName"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label={t('bootcamp:grid:last-name')}
                name="lastName"
                autoComplete="lastName"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormTextField
                type="text"
                label={t('bootcamp:grid:city')}
                name="city"
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={12}>
              <SubmitButton fullWidth label={t('bootcamp:cta:submit')} />
            </Grid>
            <Grid item xs={6}>
              <Link href={routes.bootcamp.index}>
                <Button>{t('bootcamp:cta:cancel')}</Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </GenericForm>
    </Grid>
  )
}
