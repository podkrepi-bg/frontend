import React from 'react'
import { useMutation, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid2, Typography } from '@mui/material'

import { CityFormData, CityInput, CityResponse } from 'gql/cities'
import { useCity } from 'common/hooks/cities'
import { routes } from 'common/routes'
import { ApiErrors, handleUniqueViolation } from 'service/apiErrors'
import { useCreateCity, useEditCity } from 'service/city'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import CountrySelect from 'components/admin/countries/CountrySelect'

const validationSchema: yup.SchemaOf<CityFormData> = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(3).max(25).required(),
    postalCode: yup.string().trim().min(1).max(10).required(),
    countryId: yup.string(),
  })

export default function EditForm() {
  const router = useRouter()
  const id = String(router.query.id)
  const { t } = useTranslation()
  const { data }: UseQueryResult<CityResponse> = useCity(String(id))

  const initialValues: CityInput = {
    name: data?.name,
    postalCode: data?.postalCode,
    countryId: data?.countryId,
  }

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map(() => handleUniqueViolation({ postalCode: '' }, t))
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('cities:alerts:error'), 'error')
  }

  const mutationFn = id ? useEditCity(id) : useCreateCity()

  const mutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, CityInput>({
    mutationFn,
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('cities:alerts:edit'), 'success')
      router.push(routes.admin.cities.home)
    },
  })

  async function onSubmit(values: CityInput) {
    const data = {
      name: values.name,
      postalCode: values.postalCode,
      countryId: values.countryId,
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
          {id ? t('cities:edit-form-heading') : t('cities:form-heading')}
        </Typography>
        <Grid2 container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid2 size={12}>
            <FormTextField type="text" label={t('cities:name')} name="name" autoComplete="name" />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="string"
              label={t('cities:postalCode')}
              name="postalCode"
              autoComplete="postal-code"
            />
          </Grid2>
          <Grid2 size={12}>
            <CountrySelect formField="countryId" valueName="id" />
          </Grid2>
          <Grid2 size={6}>
            <SubmitButton fullWidth label={t('cities:cta:submit')} />
          </Grid2>
          <Grid2 size={6}>
            <Link href={routes.admin.cities.home} passHref>
              <Button fullWidth>{t('cities:cta:cancel')}</Button>
            </Link>
          </Grid2>
        </Grid2>
      </Box>
    </GenericForm>
  );
}
