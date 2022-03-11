import React, { useState } from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
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

import { WithdrawalEditResponse, WithdrawalInput, WithdrawalResponse } from 'gql/withdrawals'
import {
  useBankAccountsForWithdrawal,
  useCampaignsForWithdrawal,
  usePersonListForWithdrawal,
  useVaultsForWithdrawal,
  useWithdrawal,
} from 'common/hooks/withdrawals'
import { routes } from 'common/routes'
import { ApiErrors } from 'service/apiErrors'
import { useEditWithdrawal } from 'service/withdrawal'
import { AlertStore } from 'stores/AlertStore'
import SubmitButton from 'components/common/form/SubmitButton'
import { WithdrawalStatus } from './WithdrawalTypes'
import { endpoints } from 'service/apiEndpoints'
import { usePersonList } from 'common/hooks/person'
import { useCampaignList } from 'common/hooks/campaigns'
import { useVaultsList } from 'common/hooks/vaults'
import { useBankAccountsList } from 'common/hooks/bankaccounts'

export default function EditForm() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const id = router.query.id
  const { data }: UseQueryResult<WithdrawalEditResponse> = useWithdrawal(String(id))
  const { data: bankAccounts } = useBankAccountsList()
  const { data: campaigns } = useCampaignList()
  const { data: personList } = usePersonList()
  const { data: vaults } = useVaultsList()
  const currencies = ['BGN', 'USD', 'EUR']
  const [currency, setCurrency] = useState(data?.currency)
  const [amount, setAmount] = useState(data?.amount)
  const [reason, setReason] = useState(data?.reason)
  const [bankAccountId, setBankAccountId] = useState(data?.bankAccountId)
  const [vaultId, setVaultId] = useState(data?.sourceVaultId)
  const [campaignId, setCampaignId] = useState(data?.sourceCampaignId)
  const [approvedById, setapprovedById] = useState(data?.approvedById)

  const { t } = useTranslation()

  const mutationFn = useEditWithdrawal(String(id))

  const mutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    WithdrawalInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('withdrawals:alerts:error'), 'error'),
    onSuccess: () => {
      queryClient.invalidateQueries(endpoints.withdrawals.getWithdrawal(String(id)).url)
      AlertStore.show(t('withdrawals:alerts:edit'), 'success')
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
      approvedById: approvedById,
    }

    if (
      (data.reason != undefined && data.reason.length < 4) ||
      (data.reason != undefined && data.reason?.length > 50)
    ) {
      AlertStore.show('Причината трябва да бъде между 4 и 50 символа!', 'error')
    } else if (data.sourceVaultId != undefined && data.sourceVaultId?.length < 1) {
      AlertStore.show('Моля изберете Трезор!', 'error')
    } else if (data.sourceCampaignId != undefined && data.sourceCampaignId?.length < 1) {
      AlertStore.show('Моля изберете Кампания!', 'error')
    } else if (data.bankAccountId != undefined && data.bankAccountId?.length < 1) {
      AlertStore.show('Моля изберете Банков акаунт!', 'error')
    } else if (data.currency != undefined && data.currency?.length < 1) {
      AlertStore.show('Моля изберете Валута!', 'error')
    } else if (data.amount != undefined && data.amount < 1) {
      AlertStore.show('Моля изберете Сума!', 'error')
    } else if (data.documentId != undefined && data.documentId?.length < 1) {
      AlertStore.show('Моля изберете Документ!', 'error')
    } else if (data.approvedById != undefined && data.approvedById?.length < 1) {
      AlertStore.show('Моля изберете полето "Одобрен от"!', 'error')
    } else {
      mutation.mutate(data)
    }
  }

  return (
    <Box>
      <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
        {t('withdrawals:edit-form-heading')}
      </Typography>
      <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
        <FormControl fullWidth={true} margin="normal">
          <FormLabel htmlFor="my-input">Сума</FormLabel>
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
        <FormControl fullWidth={true} margin="normal">
          <FormLabel>Одобрен от</FormLabel>
          <Select
            fullWidth
            id="approvedById"
            name="approvedById"
            value={approvedById}
            onChange={(event) => setapprovedById(event.target.value)}>
            {personList?.map((acc) => {
              return (
                <MenuItem key={acc.id} value={acc.id}>
                  {acc.firstName} {acc.lastName}
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
