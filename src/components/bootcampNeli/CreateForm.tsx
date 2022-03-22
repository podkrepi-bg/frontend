import React from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'

import { Box, Button, Grid, Typography } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { useCreateBootcampNeli } from 'service/restRequests/bootcampNeli'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'

import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import { BootcampNeliFormData, BootcampNeliInput, BootcampNeliResponse } from 'gql/bootcampNeli'

const validationSchema: yup.SchemaOf<BootcampNeliFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: yup.string().trim().min(3).max(50).required(),
    lastName: yup.string().trim().min(3).max(50).required(),
    email: yup.string().trim().email().required(),
  })

const initialValues: BootcampNeliInput = {
  firstName: '',
  lastName: '',
  email: '',
}

export default function CreateForm() {
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<
    AxiosResponse<BootcampNeliResponse>,
    AxiosError<ApiErrors>,
    BootcampNeliInput
  >({
    mutationFn: useCreateBootcampNeli(),
    onError: () => AlertStore.show(t('bootcampNeli:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('bootcampNeli:alerts:create'), 'success')
      router.push(routes.admin.bootcampNeli.index)
    },
  })

  function onSubmit(values: BootcampNeliInput) {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    }
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {t('bootcampNeli:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Module: Име" name="firstName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Module: Фамилия" name="lastName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="string" label="Module: Имейл" name="email" />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('bootcampNeli:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.bootcampNeli.index} passHref>
              <Button fullWidth>{t('bootcampNeli:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
