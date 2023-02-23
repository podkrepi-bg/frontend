import React from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Box, Button, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { CampaignResponse } from 'gql/campaigns'
import { endpoints } from 'service/apiEndpoints'
import { useEditTransfer } from 'service/transfer'
import VaultSelect from 'components/admin/vaults/VaultSelect'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import FormTextField from 'components/common/form/FormTextField'
import { TransferData, TransferInput, TransferResponse } from 'gql/transfer'

import SelectDate from './custom/SelectDate'
import { TransferStatus } from './TransferTypes'
import TransferStatusSelect from './TransferStatusSelect'
import CampaignSelect from '../../client/campaigns/CampaignSelect'
import { fromMoney, toMoney } from 'common/util/money'

const dateParser = (date: Date | undefined) => {
  if (date) {
    return date.toString().slice(0, 10)
  }
  return undefined
}

const validationSchema: yup.SchemaOf<TransferData> = yup.object().shape({
  status: yup.string().oneOf(Object.values(TransferStatus)),
  currency: yup.string().oneOf(Object.values(Currency)).required(),
  amount: yup.number().positive('Amount must be a positive number.').required(),
  reason: yup.string().trim().min(1).max(300).required(),
  documentId: yup.string().uuid().notRequired().nullable(),
  targetDate: yup.date().min(new Date(), 'Date is invalid.').notRequired().nullable(),
  approvedById: yup.string().uuid().notRequired().nullable(),
  sourceVaultId: yup.string().uuid().required(),
  sourceCampaignId: yup.string().uuid().required(),
  targetVaultId: yup.string().uuid().required(),
  targetCampaignId: yup.string().uuid().required(),
})

type Props = {
  transfer: TransferResponse
  campaigns: CampaignResponse[]
  id: string
}

export default function EditForm({ transfer, campaigns, id }: Props) {
  const { t } = useTranslation('transfer')

  const router = useRouter()

  const queryClient = useQueryClient()

  const initialValues: TransferInput = {
    status: transfer.status,
    currency: transfer.currency,
    amount: fromMoney(transfer.amount),
    reason: transfer.reason,
    documentId: transfer.documentId || '',
    targetDate: dateParser(transfer.targetDate) || '',
    approvedById: transfer.approvedById || '',
    sourceCampaignId: transfer.sourceCampaignId,
    sourceVaultId: transfer.sourceVaultId,
    targetCampaignId: transfer.targetCampaignId,
    targetVaultId: transfer.targetVaultId,
  }

  const mutation = useMutation<
    AxiosResponse<TransferResponse>,
    AxiosError<ApiErrors>,
    TransferInput
  >({
    mutationFn: useEditTransfer(id),
    onError: () => AlertStore.show(t('alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts:create'), 'success')
      queryClient.invalidateQueries([endpoints.transfer.viewTransfer(id).url])
      router.push(routes.admin.transfer.index)
    },
  })

  function handleSubmit(values: TransferInput) {
    const data: TransferInput = {
      status: values.status,
      currency: values.currency,
      amount: toMoney(values.amount),
      reason: values.reason,
      documentId: values.documentId ? values.documentId : null,
      targetDate: values.targetDate ? new Date(values.targetDate) : null,
      approvedById: values.approvedById ? values.approvedById : null,
      sourceCampaignId: values.sourceCampaignId,
      sourceVaultId: values.sourceVaultId,
      targetCampaignId: values.targetCampaignId,
      targetVaultId: values.targetVaultId,
    }
    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {t('edit-form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <TransferStatusSelect name="status" label={t('status')} />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="string" label={t('reason')} name="reason" autoComplete="reason" />
          </Grid>
          <Grid item xs={12}>
            <CurrencySelect name="currency" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField disabled type="number" label={t('amount')} name="amount" />
          </Grid>
          <Grid item xs={12}>
            <SelectDate label={t('targetDate')} name="targetDate" />
          </Grid>

          <Grid item xs={12}>
            <FormTextField
              type="string"
              label={t('documentId')}
              name="documentId"
              autoComplete="documentId"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="approvedById"
              label={t('approvedBy')}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <CampaignSelect
              name="sourceCampaignId"
              label="transfer:sourceCampaign"
              campaigns={campaigns || []}
              disabled={true}
              selectedCampaign={initialValues.sourceCampaignId as string}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect label="transfer:sourceVault" disabled={true} name="sourceVaultId" />
          </Grid>
          <Grid item xs={12}>
            <CampaignSelect
              name="targetCampaignId"
              label="transfer:targetCampaign"
              campaigns={campaigns || []}
              selectedCampaign={initialValues.sourceCampaignId as string}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect name="targetVaultId" label="transfer:targetVault" />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('transfer:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.transfer.index} passHref>
              <Button fullWidth>{t('transfer:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
