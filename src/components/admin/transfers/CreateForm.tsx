import React from 'react'
import * as yup from 'yup'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { ApiErrors } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import { CampaignResponse } from 'gql/campaigns'
import { useCreateTransfer } from 'service/transfer'
import VaultSelect from 'components/admin/vaults/VaultSelect'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import FormTextField from 'components/common/form/FormTextField'
import { TransferData, TransferInput, TransferResponse } from 'gql/transfer'

import SelectDate from './custom/SelectDate'
import { TransferStatus } from './TransferTypes'
import CampaignSelect from '../../client/campaigns/CampaignSelect'
import { useVaultsList } from 'common/hooks/vaults'
import PersonSelect from 'components/common/person/PersonSelect'
import { fromMoney, toMoney } from 'common/util/money'

type Props = {
  campaigns: CampaignResponse[]
}

const initialValues: TransferInput = {
  status: TransferStatus.initial,
  currency: Currency.BGN,
  amount: 0,
  reason: '',
  documentId: '',
  targetDate: '',
  approvedById: '',
  sourceCampaignId: '',
  sourceVaultId: '',
  targetCampaignId: '',
  targetVaultId: '',
}

export default function CreateForm({ campaigns }: Props) {
  const { t } = useTranslation('transfer')
  const router = useRouter()
  const { data: vaults } = useVaultsList()

  const validationSchema: yup.SchemaOf<TransferData> = yup.object().shape({
    status: yup.string().oneOf(Object.values(TransferStatus)),
    currency: yup.string().oneOf(Object.values(Currency)).required(),
    amount: yup.number().when('sourceVaultId', {
      is: (value: string) => value !== undefined,
      then: yup
        .number()
        .positive()
        .required()
        .test({
          name: 'max',
          exclusive: false,
          params: {},
          message: t('amount-unavailable'),
          test: function (value) {
            const currentVault = vaults?.find((curr) => curr.id == this.parent.sourceVaultId)
            const currentAmount = Number(currentVault?.amount) - Number(currentVault?.blockedAmount)
            return value ? value < Number(fromMoney(currentAmount)) : false
          },
        }),
      otherwise: yup.number().positive().integer().required(),
    }),
    reason: yup.string().trim().min(1).max(300).required(),
    documentId: yup.string().uuid().notRequired().nullable(),
    targetDate: yup.date().min(new Date(), 'Date is invalid.').notRequired().nullable(),
    approvedById: yup.string().uuid().notRequired().nullable(),
    sourceVaultId: yup.string().uuid().required(),
    sourceCampaignId: yup.string().uuid().required(),
    targetVaultId: yup.string().uuid().required(),
    targetCampaignId: yup.string().uuid().required(),
  })
  const mutation = useMutation<
    AxiosResponse<TransferResponse>,
    AxiosError<ApiErrors>,
    TransferInput
  >({
    mutationFn: useCreateTransfer(),
    onError: () => AlertStore.show(t('alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('alerts:create'), 'success')
      router.push(routes.admin.transfer.index)
    },
  })

  function handleSubmit(values: TransferInput) {
    const data: TransferInput = {
      status: TransferStatus.initial,
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
          {t('form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField type="string" label={t('reason')} name="reason" autoComplete="reason" />
          </Grid>
          <Grid item xs={12}>
            <CurrencySelect name="currency" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="number" label={t('amount')} name="amount" />
          </Grid>
          <Grid item xs={12}>
            <SelectDate name="targetDate" />
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
            <CampaignSelect
              name="sourceCampaignId"
              label="transfer:sourceCampaign"
              campaigns={campaigns || []}
              selectedCampaign={initialValues.sourceCampaignId as string}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect label="transfer:sourceVault" name="sourceVaultId" vaults={vaults} />
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
            <VaultSelect label="transfer:targetVault" name="targetVaultId" vaults={vaults} />
          </Grid>
          <Grid item xs={12}>
            <PersonSelect name="approvedById" label={t('approvedBy')} />
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
