import React from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { RecurringDonationInput, RecurringDonationResponse } from 'gql/recurring-donation'

import { Currency } from 'gql/currency'
import { useRecurringDonation } from 'common/hooks/recurringDonation'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateRecurringDonation, useEditRecurringDonation } from 'service/recurringDonation'
import { endpoints } from 'service/apiEndpoints'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import CurrencySelect from 'components/currency/CurrencySelect'
import RecurringDonationStatusSelect from './grid/RecurringDonationStatusSelect'
import PersonSelectDialog from 'components/person/PersonSelectDialog'

export enum RecurringDonationStatus {
  trialing = 'trialing',
  active = 'active',
  canceled = 'canceled',
  incomplete = 'incomplete',
  incompleteExpired = 'incompleteExpired',
  pastDue = 'pastDue',
  unpaid = 'unpaid',
}

const validCurrencies = Object.keys(Currency)
const validStatuses = Object.keys(RecurringDonationStatus)

const validationSchema = yup
  .object()
  .defined()
  .shape({
    status: yup.string().oneOf(validStatuses).required(),
    personId: yup.string().trim().max(50).required(),
    extSubscriptionId: yup.string().trim().max(50).required(),
    extCustomerId: yup.string().trim().max(50).required(),
    amount: yup.number().positive().integer().required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    sourceVault: yup.string().trim().uuid().required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  let id = router.query.id

  let initialValues: RecurringDonationInput = {
    status: '',
    personId: '',
    extSubscriptionId: '',
    extCustomerId: '',
    amount: 0,
    currency: '',
    sourceVault: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<RecurringDonationResponse> = useRecurringDonation(id)

    initialValues = {
      status: data?.status,
      personId: data?.personId,
      extSubscriptionId: data?.extSubscriptionId,
      extCustomerId: data?.extCustomerId,
      amount: data?.amount,
      currency: data?.currency,
      sourceVault: data?.sourceVault,
    }
  }

  const mutationFn = id ? useEditRecurringDonation(id) : useCreateRecurringDonation()

  const mutation = useMutation<
    AxiosResponse<RecurringDonationResponse>,
    AxiosError<ApiErrors>,
    RecurringDonationInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('recurring-donation:alerts:error'), 'error'),
    onSuccess: () => {
      if (id)
        queryClient.invalidateQueries(
          endpoints.recurringDonation.getRecurringDonation(String(id)).url,
        )
      AlertStore.show(
        id ? t('recurring-donation:alerts:edit') : t('recurring-donation:alerts:create'),
        'success',
      )
      router.push(routes.admin.recurringDonation.index)
    },
  })
  async function onSubmit(data: RecurringDonationInput) {
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('recurring-donation:edit-form-heading') : t('recurring-donation:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <RecurringDonationStatusSelect />
          </Grid>
          <Grid item xs={6}>
            <PersonSelectDialog
              onConfirm={(person) => {
                console.log(person)
              }}
            />
            {/* <FormTextField type="text" label={t('recurring-donation:personId')} name="personId" /> */}
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              label={t('recurring-donation:extSubscriptionId')}
              name="extSubscriptionId"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              label={t('recurring-donation:extCustomerId')}
              name="extCustomerId"
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="number" label={t('recurring-donation:amount')} name="amount" />
          </Grid>
          <Grid item xs={6}>
            <CurrencySelect />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('recurring-donation:vaultId')} name="sourceVault" />
          </Grid>

          {id ? <></> : <></>}
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('recurring-donation:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.recurringDonation.index} passHref>
              <Button>{t('recurring-donation:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
