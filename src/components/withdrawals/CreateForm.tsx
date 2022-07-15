import React from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, Typography } from '@mui/material'

import { WithdrawalData, WithdrawalInput, WithdrawalResponse } from 'gql/withdrawals'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateWithdrawal } from 'service/withdrawal'
import { AlertStore } from 'stores/AlertStore'
import SubmitButton from 'components/common/form/SubmitButton'
import { WithdrawalStatus } from './WithdrawalTypes'
import { useCampaignList } from 'common/hooks/campaigns'
import { useVaultsList } from 'common/hooks/vaults'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import CurrencySelect from 'components/currency/CurrencySelect'
import BankAccountSelect from 'components/bankaccounts/BankAccountSelect'
import CampaignSelect from 'components/campaigns/CampaignSelect'
import VaultSelect from 'components/vaults/VaultSelect'
import PersonSelect from 'components/person/PersonSelect'

export default function CreateForm() {
  const router = useRouter()
  const { data: campaigns } = useCampaignList()
  const { data: vaults } = useVaultsList()
  const { t } = useTranslation('withdrawals')
  const validationSchema: yup.SchemaOf<WithdrawalData> = yup
    .object()
    .defined()
    .shape({
      status: yup.string().trim().min(1).max(10).required(),
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
            message: t('transfer:amount-unavailable'),
            test: function (value) {
              const currentValt = vaults?.find((curr) => curr.id == this.parent.sourceVaultId)
              console.log(currentValt)
              const currentAmount = Number(currentValt?.amount) - Number(currentValt?.blockedAmount)
              return value! < Number(currentAmount)
            },
          }),
        otherwise: yup.number().positive().integer().required(),
      }),
      reason: yup.string().trim().min(1).max(300).required(),
      currency: yup.string().trim().min(1).max(10),
      sourceVaultId: yup.string().trim().uuid().required(),
      sourceCampaignId: yup.string(),
      bankAccountId: yup.string(),
      documentId: yup.string(),
      approvedById: yup.string(),
    })
  const initialValues: WithdrawalInput = {
    status: WithdrawalStatus.initial,
    currency: '',
    amount: 0,
    reason: '',
    sourceVaultId: '',
    sourceCampaignId: '',
    bankAccountId: '',
    documentId: '',
    approvedById: '',
  }

  const mutationFn = useCreateWithdrawal()

  const mutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    WithdrawalInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('withdrawals:alerts:create'), 'success')
      router.push(routes.admin.withdrawals.index)
    },
  })

  function handleSubmit(values: WithdrawalInput) {
    const data: WithdrawalInput = {
      status: WithdrawalStatus.initial,
      currency: values.currency,
      amount: values.amount,
      reason: values.reason,
      sourceVaultId: values.sourceVaultId,
      sourceCampaignId: values.sourceCampaignId,
      bankAccountId: values.bankAccountId,
      documentId: 'ff89a831-34da-4b2d-91bc-742247efd9b8',
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
          {t('form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField
              type="number"
              label={t('amount-input')}
              name="amount"
              autoComplete="amount"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="string" label={t('reason')} name="reason" autoComplete="reason" />
          </Grid>
          <Grid item xs={12}>
            <CurrencySelect />
          </Grid>
          <Grid item xs={12}>
            <BankAccountSelect />
          </Grid>
          <Grid item xs={12}>
            <CampaignSelect
              name="sourceCampaignId"
              label="withdrawals:sourceCampaign"
              campaigns={campaigns}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect name="sourceVaultId" />
          </Grid>
          <Grid item xs={12}>
            <PersonSelect name="approvedById" label={t('approvedBy')} />
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('cta.submit')} />
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
