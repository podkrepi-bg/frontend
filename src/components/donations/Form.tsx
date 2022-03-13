import React from 'react'
import { useMutation, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { DonationInput, DonationResponse } from 'gql/donations'
import { useDonation } from 'common/hooks/donations'
import { useCreateDonation, useEditDonation } from 'service/restRequests/donation'

const validDonationTypes = ['donation']
const validDonationStatuses = [
  'initial',
  'invalid',
  'incomplete',
  'declined',
  'waiting',
  'cancelled',
  'succeeded',
  'deleted',
  'refund',
  'paymentRequested',
]
const validProviders = ['none', 'stripe', 'paypal', 'epay', 'bank', 'cash']

const validationSchema = yup
  .object()
  .defined()
  .shape({
    type: yup.string().oneOf(validDonationTypes).required(),
    status: yup.string().oneOf(validDonationStatuses).required(),
    provider: yup.string().oneOf(validProviders).required(),
    targetVaultId: yup.string().trim(),
    currency: yup.string().trim(),
    amount: yup.number().required(),
  })

export default function EditForm() {
  const router = useRouter()
  const { t } = useTranslation()

  let id = router.query.id

  let initialValues: DonationInput = {
    type: 'donation',
    status: 'initial',
    provider: 'none',
    currency: '',
    amount: 0,
    targetVaultId: '',
    extCustomerId: '',
    extPaymentIntentId: '',
    extPaymentMethodId: '',
    // personId: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<DonationResponse> = useDonation(id)

    if (data) {
      initialValues = {
        type: data?.type,
        status: data?.status,
        provider: data?.provider,
        currency: data?.currency,
        amount: data?.amount,
        targetVaultId: data?.targetVaultId,
        extCustomerId: data?.extCustomerId,
        extPaymentIntentId: data?.extPaymentIntentId,
        extPaymentMethodId: data?.extPaymentMethodId,
        // personId: data?.personId,
      }
    }
  }

  const mutationFn = id ? useEditDonation(id) : useCreateDonation()

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    DonationInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(id ? t('donations:alerts:edit') : t('donations:alerts:create'), 'success')
      router.push(routes.admin.donations.index)
    },
  })

  async function onSubmit(data: DonationInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? 'Редактирай дарение' : 'Добави дарение'}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField type="text" label={'Тип'} name="type" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'Статус'} name="status" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label={'Доставчик'} name="provider" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'Vault ID'} name="targetVaultId" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'ID на клиент'} name="extCustomerId" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'ID на транзакция'} name="extPaymentIntentId" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'ID на плащане'} name="extPaymentMethodId" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="number" label={'Сума'} name="amount" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={'Валута'} name="currency" />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('donations:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link passHref href={routes.admin.donations.index}>
              <Button>{t('donations:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
