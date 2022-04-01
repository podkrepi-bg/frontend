import * as yup from 'yup'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useEditTransfer } from 'service/transfer'

import { routes } from 'common/routes'

import { AlertStore } from 'stores/AlertStore'

import { VaultResponse } from 'gql/vault'
import { PersonResponse } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'
import { Currency, TransferStatus } from './TransferTypes'
import { TransferData, TransferInput, TransferResponse } from 'gql/transfer'

import FormDate from './custom/FormDate'
import FormSelect from './custom/FormSelect'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

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
  sourceCampaignId: yup.string().uuid(),
  targetVaultId: yup.string().uuid().required(),
  targetCampaignId: yup.string().uuid(),
})

type props = {
  transfer: TransferResponse
  campaigns: CampaignResponse[]
  vaults: VaultResponse[]
  people: PersonResponse[]
  id: string
}

export default function EditForm({ transfer, campaigns, vaults, people, id }: props) {
  const { t } = useTranslation('transfer')

  const router = useRouter()

  const queryClient = useQueryClient()

  const [sourceCampaignId, setSourceCampaignId] = useState(transfer.sourceCampaignId)
  const [targetCampaignId, setTargetCampaignId] = useState(transfer.targetCampaignId)
  const [sourceVaultId, setSourceVaultId] = useState(transfer.sourceVaultId)
  const [targetVaultId, setTargetVaultId] = useState(transfer.targetVaultId)

  const sourceVaults = vaults.filter((v) => v.campaignId === sourceCampaignId)
  const targetVaults = vaults.filter((v) => v.campaignId === targetCampaignId)

  const initialValues: TransferInput = {
    status: transfer.status,
    currency: transfer.currency,
    amount: transfer.amount,
    reason: transfer.reason,
    documentId: transfer.documentId || '',
    targetDate: dateParser(transfer.targetDate) || '',
    approvedById: transfer.approvedById || '',
    sourceCampaignId: sourceCampaignId,
    sourceVaultId: sourceVaultId,
    targetCampaignId: targetCampaignId,
    targetVaultId: targetVaultId,
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
      queryClient.invalidateQueries(endpoints.transfer.viewTransfer(id).url)
      router.push(routes.admin.transfer.index)
    },
  })

  function handleSubmit(values: TransferInput) {
    const data: TransferInput = {
      status: values.status,
      currency: values.currency,
      amount: values.amount,
      reason: values.reason,
      documentId: values.documentId ? values.documentId : null,
      targetDate: values.targetDate ? new Date(values.targetDate) : null,
      approvedById: values.approvedById ? values.approvedById : null,
      sourceCampaignId: sourceCampaignId,
      sourceVaultId: sourceVaultId,
      targetCampaignId: targetCampaignId,
      targetVaultId: targetVaultId,
    }
    if (
      !data.sourceCampaignId ||
      !data.targetCampaignId ||
      !data.sourceVaultId ||
      !data.targetVaultId
    ) {
      return
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
            <FormSelect name="status" label={t('status')}>
              {(Object.values(TransferStatus) || []).map((status) => {
                return (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                )
              })}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="string" label={t('reason')} name="reason" autoComplete="reason" />
          </Grid>
          <Grid item xs={12}>
            <FormSelect name="currency" label={t('currency')}>
              {(Object.values(Currency) || []).map((currency) => {
                return (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                )
              })}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="number" label={t('amount')} name="amount" />
          </Grid>
          <Grid item xs={12}>
            <FormDate label={t('targetDate')} name="targetDate"></FormDate>
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
            <FormSelect name="approvedById" label={t('approvedBy')}>
              {[{ id: '', firstName: <em>None</em>, lastName: '' }, ...people].map((p) => {
                return (
                  <MenuItem key={p.id} value={p.id}>
                    {p.firstName} {p.lastName}
                  </MenuItem>
                )
              })}
            </FormSelect>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t('sourceCampaign')}</InputLabel>
              <Select
                type="string"
                sx={{ height: '55%' }}
                label={t('sourceCampaign')}
                name="sourceCampaignId"
                value={sourceCampaignId}
                onChange={(event) => {
                  setSourceVaultId('')
                  setSourceCampaignId(event.target.value)
                }}>
                {[{ id: '', title: '' }, ...campaigns].map((p) => {
                  return (
                    <MenuItem key={p.id} value={p.id}>
                      {p.title}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t('sourceVault')}</InputLabel>
              <Select
                type="string"
                sx={{ height: '55%' }}
                label={t('sourceVaultId')}
                name="sourceVaultId"
                value={sourceVaultId}
                onChange={(event) => {
                  setSourceVaultId(event.target.value)
                }}>
                {[{ id: '', name: <em>None</em> }, ...sourceVaults].map((p) => {
                  return (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t('targetCampaign')}</InputLabel>
              <Select
                type="string"
                label={t('targetCampaign')}
                name="targetCampaignId"
                value={targetCampaignId}
                onChange={(event) => {
                  setTargetVaultId('')
                  setTargetCampaignId(event.target.value)
                }}>
                {[{ id: '', title: '' }, ...campaigns].map((p) => {
                  return (
                    <MenuItem key={p.id} value={p.id}>
                      {p.title}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl size="small" fullWidth>
              <InputLabel>{t('targetVault')}</InputLabel>
              <Select
                type="string"
                sx={{ height: '55%' }}
                label={t('targetVaultId')}
                name="targetVaultId"
                value={targetVaultId}
                onChange={(event) => {
                  setTargetVaultId(event.target.value)
                }}>
                {[{ id: '', name: <em>None</em> }, ...targetVaults].map((p) => {
                  return (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
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
