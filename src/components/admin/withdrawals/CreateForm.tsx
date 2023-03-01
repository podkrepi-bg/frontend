import React from 'react'
import { useMutation } from '@tanstack/react-query'
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
import BankAccountSelect from 'components/admin/bankaccounts/BankAccountSelect'
import CampaignSelect, { SetFieldValueType } from 'components/client/campaigns/CampaignSelect'
import VaultSelect from 'components/admin/vaults/VaultSelect'
import PersonSelect from 'components/common/person/PersonSelect'
import { Currency } from 'gql/currency'
import { fromMoney, toMoney } from 'common/util/money'
import { v4 as uuidv4 } from 'uuid'

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
            message: t('amount-unavailable'),
            test: function (value) {
              const currentVault = vaults?.find((curr) => curr.id === this.parent.sourceVaultId)
              const currentAmount =
                Number(currentVault?.amount) - Number(currentVault?.blockedAmount)
              return Number(value) < Number(fromMoney(currentAmount))
            },
          }),
        otherwise: yup.number().positive().integer().required(),
      }),
      reason: yup.string().trim().min(1).max(300).required(),
      currency: yup.string().oneOf(Object.values(Currency)).required(),
      sourceVaultId: yup.string().uuid().required(),
      sourceCampaignId: yup.string().uuid().required(),
      bankAccountId: yup.string().uuid().required(),
      documentId: yup.string().uuid().required(),
      approvedById: yup.string().uuid().required(),
    })
  const initialValues: WithdrawalInput = {
    status: WithdrawalStatus.initial,
    currency: '',
    amount: 0,
    amountAvailable: 0,
    reason: '',
    sourceVaultId: '',
    sourceCampaignId: '',
    bankAccountId: '',
    documentId: uuidv4(), //this will be the id of the uploaded doc when attachments are implemented
    approvedById: '',
  }

  const mutationFn = useCreateWithdrawal()

  const mutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    WithdrawalData
  >({
    mutationFn,
    onError: () => AlertStore.show(t('withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('withdrawals:alerts:create'), 'success')
      router.push(routes.admin.withdrawals.index)
    },
  })

  function handleSubmit(values: WithdrawalInput) {
    const data: WithdrawalData = {
      status: WithdrawalStatus.initial,
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

  function handleCampaignSelected(campaignId: string, setFieldValue: SetFieldValueType) {
    const selectedCampaign = campaigns?.find((campaign) => campaign.id === campaignId)
    if (selectedCampaign) {
      setFieldValue('currency', selectedCampaign?.currency)
    }
  }

  function handleVaultSelected(vaultId: string, setFieldValue: SetFieldValueType) {
    const selectedVault = vaults?.find((vault) => vault.id === vaultId)
    if (selectedVault) {
      setFieldValue(
        'amountAvailable',
        fromMoney(selectedVault.amount - selectedVault.blockedAmount),
      )
    }
  }

  return (
    <GenericForm<WithdrawalInput>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {t('form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <CampaignSelect
              name="sourceCampaignId"
              label="withdrawals:sourceCampaign"
              campaigns={campaigns}
              handleCampaignSelected={handleCampaignSelected}
              selectedCampaign={initialValues.sourceCampaignId as string}
            />
          </Grid>
          <Grid item xs={12}>
            <VaultSelect
              name="sourceVaultId"
              label="withdrawals:sourceVault"
              vaults={vaults}
              handleVaultSelected={handleVaultSelected}
            />
          </Grid>
          <Grid item xs={8}>
            <FormTextField
              type="number"
              label={t('amount-available')}
              name="amountAvailable"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <FormTextField
              type="text"
              label={t('currency')}
              name="currency"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="number"
              label={t('amount-input')}
              name="amount"
              autoComplete="amount"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="text" label={t('reason')} name="reason" autoComplete="reason" />
          </Grid>

          <Grid item xs={12}>
            <BankAccountSelect />
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
