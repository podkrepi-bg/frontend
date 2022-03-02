import React from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { VaultInput, VaultResponse } from 'gql/vault'
import { useVault } from 'common/hooks/vaults'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateVault, useEditVault } from 'service/restRequests'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { endpoints } from 'service/apiEndpoints'

const validCurrencies = ['BGN', 'USD', 'EUR']

const validationSchema = yup
  .object()
  .defined()
  .shape({
    name: yup.string().trim().min(2).max(50).required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    campaignId: yup.string().trim().max(50).required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  let id = router.query.id

  let initialValues: VaultInput = {
    name: '',
    currency: '',
    campaignId: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<VaultResponse> = useVault(id)

    initialValues = {
      name: data?.name,
      currency: data?.currency,
      campaignId: data?.campaignId,
    }
  }

  const mutationFn = id ? useEditVault(id) : useCreateVault()

  const mutation = useMutation<AxiosResponse<VaultResponse>, AxiosError<ApiErrors>, VaultInput>({
    mutationFn,
    onError: () => AlertStore.show(t('vaults:alerts:error'), 'error'),
    onSuccess: () => {
      if (id) queryClient.invalidateQueries(endpoints.vaults.getVault(String(id)).url)
      AlertStore.show(id ? t('vaults:alerts:edit') : t('vaults:alerts:create'), 'success')
      router.push(routes.admin.vaults.index)
    },
  })

  async function onSubmit(data: VaultInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('vaults:edit-form-heading') : t('vaults:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('vaults:name')} name="name" />
          </Grid>
          {id ? (
            <></>
          ) : (
            <>
              <Grid item xs={6}>
                <FormTextField type="text" label={t('vaults:currency')} name="currency" />
              </Grid>
              <Grid item xs={6}>
                <FormTextField type="text" label={t('vaults:campaignId')} name="campaignId" />
              </Grid>
            </>
          )}
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('vaults:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.vaults.index}>
              <Button>{t('vaults:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
