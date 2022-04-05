import React, { useState } from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { BootcampFormData, BootcampInput, BootcampResponse } from 'gql/bootcamp'
import { useTask } from 'common/hooks/bootcamp'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateBootcamp, useEditBootcamp } from 'service/bootcamp'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { parse, isDate, format } from 'date-fns'

const formatString = 'yyyy-MM-dd'

const validBootcampStatuses = ['todo', 'inProgress', 'forReview', 'done', 'other']

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

export default function BootcampEditForm() {
  const router = useRouter()
  const [status, setStatus] = useState<string>()
  const id = String(router.query.id)
  const { t } = useTranslation()
  const { data }: UseQueryResult<BootcampResponse> = useTask(String(id))

  const initialValues: BootcampInput = {
    status: data?.status,
    title: data?.title,
    email: data?.email,
    message: data?.message,
    startDate: format(new Date(data?.startDate ?? new Date()), formatString),
    endDate: format(new Date(data?.endDate ?? new Date()), formatString),
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
      status: status,
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
          {t('bootcamp:tasks:editTask')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelStatus">{t('bootcamp:status')}</InputLabel>
              <Select
                labelId={t('bootcamp:status')}
                label={t('bootcamp:status')}
                id="status"
                name="status"
                defaultValue={initialValues.status}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}>
                {validBootcampStatuses.map((stat) => {
                  return (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label="Title: Заглавие" name="title" autoComplete="title" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="Email: Имейл адрес"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="string"
              name="message"
              label="bootcamp:message"
              autoComplete="message"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="startDate"
              label="bootcamp:startDate"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField type="date" name="endDate" label="bootcamp:endDate" helperText={null} />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="bootcamp:firstName"
              name="firstName"
              autoComplete="firstName"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="bootcamp:lastName"
              name="lastName"
              autoComplete="lastName"
            />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('bootcamp:cta:edit')} />
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
