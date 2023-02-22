import React from 'react'
import { useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import {
  WithdrawalData,
  WithdrawalEditResponse,
  WithdrawalInput,
  WithdrawalResponse,
} from 'gql/withdrawals'
import { useWithdrawal } from 'common/hooks/withdrawals'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useEditWithdrawal } from 'service/withdrawal'
import { AlertStore } from 'stores/AlertStore'
import SubmitButton from 'components/common/form/SubmitButton'
import { WithdrawalStatus } from './WithdrawalTypes'
import { endpoints } from 'service/apiEndpoints'
import { useCampaignList } from 'common/hooks/campaigns'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import CampaignSelect from 'components/client/campaigns/CampaignSelect'
import VaultSelect from 'components/admin/vaults/VaultSelect'
import PersonSelect from 'components/common/person/PersonSelect'
import BankAccountSelect from 'components/admin/bankaccounts/BankAccountSelect'
import { Currency } from 'gql/currency'
import { fromMoney, toMoney } from 'common/util/money'
import { useVaultsList } from 'common/hooks/vaults'
import FormSelectField from 'components/common/form/FormSelectField'

const validationSchema: yup.SchemaOf<WithdrawalData> = yup
  .object()
  .defined()
  .shape({
    status: yup.string().trim().min(1).max(10).required(),
    amount: yup.number().positive().integer().required(),
    reason: yup.string().trim().min(1).max(300).required(),
    currency: yup.string().oneOf(Object.values(Currency)).required(),
    sourceVaultId: yup.string().uuid().required(),
    sourceCampaignId: yup.string().uuid().required(),
    bankAccountId: yup.string().uuid().required(),
    documentId: yup.string().uuid().required(),
    approvedById: yup.string().uuid().required(),
  })

export default function EditForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const id = router.query.id
  const { data }: UseQueryResult<WithdrawalEditResponse> = useWithdrawal(String(id))
  const { t } = useTranslation('withdrawals')
  const { data: campaigns } = useCampaignList()
  const { data: vaults } = useVaultsList()

  const mutationFn = useEditWithdrawal(String(id))

  const initialValues: WithdrawalInput = {
    status: data?.status,
    currency: data?.currency,
    amount: fromMoney(data?.amount ?? 0),
    amountAvailable: 0,
    reason: data?.reason,
    sourceVaultId: data?.sourceVaultId,
    sourceCampaignId: data?.sourceCampaignId,
    bankAccountId: data?.bankAccountId,
    documentId: data?.documentId,
    approvedById: data?.approvedById,
  }

  const mutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    WithdrawalData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      queryClient.invalidateQueries([endpoints.withdrawals.getWithdrawal(String(id)).url])
      AlertStore.show(t('withdrawals:alerts:edit'), 'success')
      router.push(routes.admin.withdrawals.index)
    },
  })

  function handleSubmit(values: WithdrawalInput) {
    const data: WithdrawalData = {
      status: values.status,
      currency: values.currency,
      amount: toMoney(values.amount),
      reason: values.reason,
      sourceVaultId: values.sourceVaultId,
      sourceCampaignId: values.sourceCampaignId,
      bankAccountId: values.bankAccountId,
      documentId: values.documentId,
      approvedById: values.approvedById,
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
        <Typography
          variant="subtitle2"
          component="h2"
          sx={{ marginBottom: 2, textAlign: 'center' }}>
          {initialValues.status === WithdrawalStatus.succeeded
            ? t('withdrawals:alerts.no-edit')
            : ''}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={8}>
            <FormTextField
              type="number"
              label={t('amount-input')}
              name="amount"
              autoComplete="amount"
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <CurrencySelect disabled={true} />
          </Grid>
          <Grid item xs={12}>
            <FormSelectField
              name="status"
              label={t('status')}
              options={Object.keys(WithdrawalStatus).map((key: string) => {
                return {
                  key,
                  value: WithdrawalStatus[key as WithdrawalStatus],
                  name: t(`statuses.${key}`),
                }
              })}
              disabled={initialValues.status === WithdrawalStatus.succeeded}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label={t('reason')}
              name="reason"
              autoComplete="reason"
              disabled={initialValues.status === WithdrawalStatus.succeeded}
            />
          </Grid>
          <Grid item xs={12}>
            <BankAccountSelect disabled={initialValues.status === WithdrawalStatus.succeeded} />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label={t('documentId')}
              name="documentId"
              autoComplete="documentId"
              disabled={initialValues.status === WithdrawalStatus.succeeded}
            />
          </Grid>
          <Grid item xs={12}>
            <CampaignSelect
              name="sourceCampaignId"
              label="withdrawals:sourceCampaign"
              campaigns={campaigns}
              disabled={true}
              selectedCampaign={initialValues.sourceCampaignId as string}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect
              name="sourceVaultId"
              label="withdrawals:sourceVault"
              vaults={vaults}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12}>
            <PersonSelect disabled name="approvedById" label={t('approvedBy')} />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton
              fullWidth
              label={t('cta.submit')}
              disabled={initialValues.status === WithdrawalStatus.succeeded}
            />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.withdrawals.index} passHref>
              <Button fullWidth={true}>{t('cta.cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
