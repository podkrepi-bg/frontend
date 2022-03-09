import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { WithdrawalInput, WithdrawalResponse } from 'gql/withdrawals'
import {
  useBankAccountsForWithdrawal,
  useCampaignsForWithdrawal,
  useVaultsForWithdrawal,
} from 'common/hooks/withdrawals'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useCreateWithdrawal } from 'service/withdrawal'
import { AlertStore } from 'stores/AlertStore'
import SubmitButton from 'components/common/form/SubmitButton'
import { WithdrawalStatus } from './WithdrawalTypes'

// const validationSchema = yup
//   .object()
//   .defined()
//   .shape({
//     status: yup.string().trim().min(2).max(50).required(),
//     currency: yup.string().oneOf(validCurrencies).required(),
//     amount: yup.number().min(1).max(50000000).required(),
//     reason: yup.string().trim().max(50).required(),
//   })

export default function EditForm() {
  const router = useRouter()
  const bankAccounts = useBankAccountsForWithdrawal()
  const vaults = useVaultsForWithdrawal()
  const campaigns = useCampaignsForWithdrawal()
  const currencies = ['BGN', 'USD', 'EUR']
  const [currency, setCurrency] = useState('')
  const [amount, setAmount] = useState(Number)
  const [reason, setReason] = useState('')
  const [bankAccountId, setBankAccountId] = useState('')
  const [vaultId, setVaultId] = useState('')
  const [campaignId, setCampaignId] = useState('')

  const { t } = useTranslation()

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

  function handleSubmit() {
    const data: WithdrawalInput = {
      status: WithdrawalStatus.initial,
      currency: currency,
      amount: amount,
      reason: reason,
      sourceVaultId: vaultId,
      sourceCampaignId: campaignId,
      bankAccountId: bankAccountId,
      documentId: '6061b425-34e6-45bf-b563-a85b933c9339',
      approvedById: '0a0770d7-f128-44e7-b587-bbe3ad924f71',
    }
    mutation.mutate(data)
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
        {t('withdrawals:form-heading')}
      </Typography>
      <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel htmlFor="my-input">Стойност</FormLabel>
          <Input
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            id="amount"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel htmlFor="my-input">Причина</FormLabel>
          <Input
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            id="reason"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel>Валути</FormLabel>
          <Select
            id="currency"
            name="currency"
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}>
            {currencies?.map((curr) => {
              return (
                <MenuItem key={curr} value={curr}>
                  {curr}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel>Банков акаунт</FormLabel>
          <Select
            id="bankAccountId"
            name="bankAccountId"
            value={bankAccountId}
            onChange={(event) => setBankAccountId(event.target.value)}>
            {bankAccounts?.map((acc) => {
              return (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.accountHolderName}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel>Кампании</FormLabel>
          <Select
            id="campaignId"
            name="campaignId"
            value={campaignId}
            onChange={(event) => setCampaignId(event.target.value)}>
            {campaigns?.map((camp) => {
              return (
                <MenuItem key={camp.id} value={camp.id}>
                  {camp.title}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel>Трезор</FormLabel>
          <Select
            fullWidth
            id="vaultId"
            name="vaultId"
            value={vaultId}
            onChange={(event) => setVaultId(event.target.value)}>
            {vaults?.map((acc) => {
              return (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <Grid item xs={6}>
          <SubmitButton onClick={handleSubmit} fullWidth label={t('withdrawals:cta:submit')} />
        </Grid>
        <Grid item xs={6}>
          <Link href={routes.admin.withdrawals.index} passHref>
            <Button fullWidth={true}>{t('withdrawals:cta:cancel')}</Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  )
}
