import React, { useState } from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import { Box, Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'

import { WithdrawalInput, WithdrawalResponse } from 'gql/withdrawals'
import { useBankAccountsForWithdrawal, useVaultsForWithdrawal, useWithdrawal } from 'common/hooks/withdrawals'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateWithdrawal, useEditWithdrawal } from 'service/withdrawal'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { endpoints } from 'service/apiEndpoints'
import { WithdrawalStatus } from './WithdrawalTypes'


const validCurrencies = ['BGN', 'USD', 'EUR']

const validationSchema = yup
  .object()
  .defined()
  .shape({
    status: yup.string().trim().min(2).max(50).required(),
    currency: yup.string().oneOf(validCurrencies).required(),
    amount: yup.number().min(1).max(50000000).required(),
    reason: yup.string().trim().max(50).required(),
  })

export default function EditForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const bankAccounts = useBankAccountsForWithdrawal()
  const [bankAccountId, setBankAccountId] = useState('')
  const vaults = useVaultsForWithdrawal()
  const [vaultId, setVaultId] = useState('')
  const { t } = useTranslation()

  let id = router.query.id

  let initialValues: WithdrawalInput = {
    status: WithdrawalStatus.new,
    currency: '',
    amount: 0,
    reason: '',
    documentId: '',
    approvedBy: '',
    bankAccount: '',
    sourceCampaign: '',
    sourceVault: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<WithdrawalResponse> = useWithdrawal(id)

    initialValues = {
      status: data?.status,
      currency: data?.currency,
      amount: data?.amount,
      reason: data?.reason,
      documentId: data?.documentId,
      approvedBy: data?.approvedBy,
      bankAccount: data?.bankAccount,
      sourceCampaign: data?.sourceCampaign,
      sourceVault: data?.sourceVault,
    }
  }

  const mutationFn = id ? useEditWithdrawal(id) : useCreateWithdrawal()

  const mutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    WithdrawalInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('Withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      if (id) queryClient.invalidateQueries(endpoints.withdrawals.getWithdrawal(String(id)).url)
      AlertStore.show(id ? t('withdrawals:alerts:edit') : t('withdrawals:alerts:create'), 'success')
      router.push(routes.admin.withdrawals.index)
    },
  })

  async function onSubmit(data: WithdrawalInput) {
    { console.log(data) }
    mutation.mutate(data)
  }

  function handleBankAccountChange(event: SelectChangeEvent) {
    {console.log(event.target.value)}
    setBankAccountId(event.target.value)
  }

  function handleVaultChange(event: SelectChangeEvent) {
    {console.log(event.target.value)}
    setVaultId(event.target.value)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('withdrawals:edit-form-heading') : t('withdrawals:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('withdrawals:status')} name="status" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('withdrawals:amount')} name="amount" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('withdrawals:currency')} name="currency" />
          </Grid>
          <Grid item xs={6}>
            <FormTextField type="text" label={t('withdrawals:reason')} name="reason" />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Банков акаунт</InputLabel>
            <Select
              fullWidth
              id="bankAccountId"
              name="bankAccountId"
              value={bankAccountId}
              onChange={handleBankAccountChange}>
              {bankAccounts?.map((acc) => {
                return (
                  <MenuItem key={acc.id} value={acc.id}>
                    {acc.accountHolderName}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Трезор</InputLabel>
            <Select
              fullWidth
              id="vaultId"
              name="vaultId"
              value={vaultId}
              onChange={handleVaultChange}>
              {vaults?.map((acc) => {
                return (
                  <MenuItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          {id ? (
            <></>
          ) : (
            <>
              {/* <Grid item xs={6}>
                <FormTextField type="text" label={t('withdrawals:campaignId')} name="campaignId" />
              </Grid> */}
            </>
          )}
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('withdrawals:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.withdrawals.index}>
              <Button>{t('withdrawals:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
