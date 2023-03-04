import React, { useState } from 'react'
import { useMutation, UseQueryResult } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { AxiosError, AxiosResponse } from 'axios'
import * as yup from 'yup'
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

import { routes } from 'common/routes'
import { ApiErrors, handleUniqueViolation } from 'service/apiErrors'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import SubmitButton from 'components/common/form/SubmitButton'
import { DonationInput, DonationResponse } from 'gql/donations'
import { useDonation } from 'common/hooks/donation'
import { useCreateDonation, useEditDonation } from 'service/donation'
import { useVaultsList } from 'common/hooks/vaults'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { bg, enUS } from 'date-fns/locale'

const validDonationTypes = ['donation']
const validDonationStatuses = [
  'initial',
  'invalid',
  'incomplete',
  'declined',
  'waiting',
  'cancelled',
  'succeeded',
  'deleted',
  'refund',
  'paymentRequested',
]
const validProviders = ['none', 'stripe', 'paypal', 'epay', 'bank', 'cash']
const validCurrencies = ['BGN', 'EUR']

const validationSchema = yup.object().defined().shape({
  amount: yup.number().positive().required(),
})

export default function EditForm() {
  const { t, i18n } = useTranslation()
  const [type, setType] = useState('donation')
  const [status, setStatus] = useState('initial')
  const [provider, setProvider] = useState('none')
  const [currency, setCurrency] = useState('')
  const [vault, setVault] = useState('')
  const [date, setToDate] = React.useState<Date | null>(new Date())
  const router = useRouter()

  let id = router.query.id

  const vaults = useVaultsList().data

  let initialValues: DonationInput = {
    type: 'donation',
    status: 'initial',
    provider: 'none',
    currency: '',
    amount: 0,
    createdAt: new Date(),
    targetVaultId: '',
    extCustomerId: '',
    extPaymentIntentId: '',
    extPaymentMethodId: '',
  }

  if (id) {
    id = String(id)
    const { data }: UseQueryResult<DonationResponse> = useDonation(id)

    if (data) {
      initialValues = {
        type: data?.type.toString(),
        status: data?.status.toString(),
        provider: data?.provider.toString(),
        createdAt: data?.createdAt,
        currency: data?.currency.toString(),
        amount: data?.amount,
        targetVaultId: data?.targetVaultId,
        extCustomerId: data?.extCustomerId,
        extPaymentIntentId: data?.extPaymentIntentId,
        extPaymentMethodId: data?.extPaymentMethodId,
      }
    }
  }

  const mutationFn = id ? useEditDonation(id) : useCreateDonation()

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map((el) => handleUniqueViolation(el.constraints, t))
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('donations:alerts:error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    DonationInput
  >({
    mutationFn,
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(id ? t('donations:alerts:edit') : t('donations:alerts:create'), 'success')
      router.push(routes.admin.donations.index)
    },
  })

  async function onSubmit(data: DonationInput) {
    type ? (data.type = type) : ''
    status ? (data.status = status) : ''
    provider ? (data.provider = provider) : ''
    currency ? (data.currency = currency) : ''
    vault ? (data.targetVaultId = vault) : ''

    mutation.mutate(data)
  }

  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Box sx={{ marginTop: '5%', height: '62.6vh' }}>
        <Typography variant="h5" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
          {id ? t('donations:edit-form-heading') : t('donations:form-heading')}
        </Typography>
        <Grid container spacing={2} sx={{ width: 600, margin: '0 auto' }}>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelType">{t('donations:type')}</InputLabel>
              <Select
                labelId="labelType"
                label={t('donations:type')}
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                disabled={id ? true : false}>
                {validDonationTypes.map((type) => {
                  return (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelStatus">{t('donations:status')}</InputLabel>
              <Select
                labelId="labelStatus"
                label={t('donations:status')}
                id="status"
                name="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value)
                }}>
                {validDonationStatuses.map((stat) => {
                  return (
                    <MenuItem key={stat} value={stat}>
                      {stat}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelProvider">{t('donations:provider')}</InputLabel>
              <Select
                labelId="labelProvider"
                label={t('donations:provider')}
                id="provider"
                name="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                disabled={id ? true : false}>
                {validProviders.map((prov) => {
                  return (
                    <MenuItem key={prov} value={prov}>
                      {prov}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider
              adapterLocale={i18n.language === 'bg' ? bg : enUS}
              dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label={t('donations:created-at')}
                value={date}
                onChange={setToDate}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelVault">{t('donations:vault')}</InputLabel>
              <Select
                labelId="labelVault"
                label={t('donations:vault')}
                id="targetVaultId"
                name="targetVaultId"
                value={vault}
                onChange={(e) => setVault(e.target.value)}
                disabled={id ? true : false}>
                {vaults?.map((vault) => {
                  return (
                    <MenuItem key={vault.id} value={vault.id}>
                      {vault.name}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              label={t('donations:ext-customer-id')}
              name="extCustomerId"
              disabled={id ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              label={t('donations:ext-payment-intent-id')}
              name="extPaymentIntentId"
              disabled={id ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="text"
              label={t('donations:ext-payment-method-id')}
              name="extPaymentMethodId"
              disabled={id ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <FormTextField
              type="number"
              label={t('donations:amount')}
              name="amount"
              disabled={id ? true : false}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel id="labelCurrency">{t('donations:currency')}</InputLabel>
              <Select
                labelId="labelCurrency"
                label={t('donations:currency')}
                id="currency"
                name="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                disabled={id ? true : false}>
                {validCurrencies.map((currency) => {
                  return (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <SubmitButton fullWidth label={t('donations:cta:submit')} />
          </Grid>
          <Grid item xs={6}>
            <Link passHref href={routes.admin.donations.index}>
              <Button fullWidth>{t('donations:cta:cancel')}</Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </GenericForm>
  )
}
