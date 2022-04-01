import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { BootcampFormData, BootcampInput, BootcampResponse } from 'gql/bootcamp'
import { useTask } from 'common/hooks/bootcamp'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateBootcamp, useEditBootcamp } from 'service/bootcamp'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import SelectCountry from 'components/campaigns/SelectCountry'
import { parse, isDate } from 'date-fns'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<BootcampFormData> = yup
  .object()
  .defined()
  .shape({
    status: yup.string().required(),
    title: yup.string().trim().min(1).max(25).required(),
    email: yup.string().required().email(),
    message: yup.string().trim().min(1).max(25).required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    firstName: yup.string().trim().min(1).max(25).required(),
    lastName: yup.string().trim().min(1).max(25).required(),
  })

export default function EditForm() {
  const router = useRouter()
  const id = String(router.query.id)
  const { t } = useTranslation()
  const { data }: UseQueryResult<BootcampResponse> = useTask(String(id))

  const initialValues: BootcampInput = {
    status: data?.status,
    title: data?.title,
    email: data?.email,
    message: data?.message,
    startDate: data?.startDate || null,
    endDate: data?.endDate || null,
    firstName: data?.firstName,
    lastName: data?.lastName,
  }

  const mutationFn = id ? useEditBootcamp(id) : useCreateBootcamp()

  const mutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    BootcampInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('bootcamp:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('bootcamp:alerts:edit'), 'success')
      router.push(routes.admin.bootcamp.index)
    },
  })

  async function onSubmit(values: BootcampInput) {
    const data = {
      status: values.status,
      title: values.title,
      email: values.email,
      message: values.message,
      startDate: values.startDate,
      endDate: values.endDate,
      firstName: values.firstName,
      lastName: values.lastName,
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
          {id ? t('bootcamp:edit-form-heading') : t('bootcamp:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField type="text" label="Cities: Име" name="name" autoComplete="name" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="Cities:Пощенски код"
              name="postalCode"
              autoComplete="postal-code"
            />
          </Grid>
          <Grid item xs={12}>
            <SelectCountry />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('bootcamp:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.bootcamp.index} passHref>
              <Button fullWidth>{t('bootcamp:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
