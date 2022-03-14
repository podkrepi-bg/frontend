import React, { useState } from 'react'
import { useMutation, useQueryClient, UseQueryResult } from 'react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import { Box, Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

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
import { usePersonList } from 'common/hooks/person'
import { useCampaignList } from 'common/hooks/campaigns'
import { useVaultsList } from 'common/hooks/vaults'
import { useBankAccountsList } from 'common/hooks/bankaccounts'
import FormTextField from 'components/common/form/FormTextField'
import GenericForm from 'components/common/form/GenericForm'
import * as yup from 'yup'

const validationSchema: yup.SchemaOf<WithdrawalData> = yup
  .object()
  .defined()
  .shape({
    status: yup.string().trim().min(1).max(10).required(),
    amount: yup.number().required(),
    reason: yup.string().trim().min(1).max(300).required(),
    currency: yup.string().trim().min(1).max(10),
    sourceVaultId: yup.string(),
    sourceCampaignId: yup.string(),
    bankAccountId: yup.string(),
    documentId: yup.string(),
    approvedById: yup.string(),
  })

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
  const [bankAccountId, setBankAccountId] = useState(data?.bankAccountId)
  const [vaultId, setVaultId] = useState(data?.sourceVaultId)
  const [campaignId, setCampaignId] = useState(data?.sourceCampaignId)
  const [approvedById, setApprovedById] = useState(data?.approvedById)

  const { t } = useTranslation()

  const mutationFn = useEditWithdrawal(String(id))

  const initialValues: WithdrawalInput = {
    status: WithdrawalStatus.initial,
    currency: currency,
    amount: data?.amount,
    reason: data?.reason,
    sourceVaultId: vaultId,
    sourceCampaignId: campaignId,
    bankAccountId: bankAccountId,
    documentId: '',
    approvedById: approvedById,
  }

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

  function handleSubmit(values: WithdrawalInput) {
    const data: WithdrawalInput = {
      status: WithdrawalStatus.initial,
      currency: currency,
      amount: values.amount,
      reason: values.reason,
      sourceVaultId: vaultId,
      sourceCampaignId: campaignId,
      bankAccountId: bankAccountId,
      documentId: 'ff89a831-34da-4b2d-91bc-742247efd9b8',
      approvedById: approvedById,
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
          {t('withdrawals:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={12}>
            <FormTextField
              type="number"
              label="wihdrawals:Сума"
              name="amount"
              autoComplete="amount"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="string"
              label="wihdrawals:Причина"
              name="reason"
              autoComplete="reason"
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="my-input">Валути</InputLabel>
            <Select
              fullWidth
              type="enum"
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
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="my-input">Банков акаунт</InputLabel>
            <Select
              fullWidth
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
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="my-input">Кампании</InputLabel>
            <Select
              fullWidth
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
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="my-input">Трезор</InputLabel>
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
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="my-input">Одобрен от</InputLabel>
            <Select
              fullWidth
              id="approvedById"
              name="approvedById"
              value={approvedById}
              onChange={(event) => setApprovedById(event.target.value)}>
              {personList?.map((acc) => {
                return (
                  <MenuItem key={acc.id} value={acc.id}>
                    {acc.firstName} {acc.lastName}
                  </MenuItem>
                )
              })}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('withdrawals:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link href={routes.admin.withdrawals.index} passHref>
              <Button fullWidth={true}>{t('withdrawals:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
