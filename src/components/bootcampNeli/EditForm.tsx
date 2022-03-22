import React from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, UseQueryResult, useQueryClient } from 'react-query'

import { Box, Button, Grid, Typography } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useEditBootcampNeli } from 'service/restRequests/bootcampNeli'

import { AlertStore } from 'stores/AlertStore'

import { routes } from 'common/routes'
import { useBootcampNeli } from 'common/hooks/bookcampNeli'

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

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const id = String(router.query.id)
  const { t } = useTranslation()
  const { data }: UseQueryResult<BootcampNeliResponse> = useBootcampNeli(String(id))

  const initialValues: BootcampNeliInput = {
    firstName: data?.firstName || '',
    lastName: data?.lastName || '',
    email: data?.email || '',
  }

  const mutation = useMutation<
    AxiosResponse<BootcampNeliResponse>,
    AxiosError<ApiErrors>,
    BootcampNeliInput
  >({
    mutationFn: useEditBootcampNeli(id),
    onError: () => AlertStore.show(t('bootcampNeli:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('bootcampNeli:alerts:edit'), 'success')
      queryClient.invalidateQueries(endpoints.bootcampNeli.viewBootcampNeli(id).url)
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
          {id ? t('bootcampNeli:edit-form-heading') : t('bootcampNeli:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="Module: Име"
              name="firstName"
              autoComplete="first-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="Module: Фамилия"
              name="lastName"
              autoComplete="last-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="string" label="Module: Имейл" name="email" autoComplete="email" />
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
