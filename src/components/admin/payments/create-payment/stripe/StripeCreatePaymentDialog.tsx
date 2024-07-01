import {
  Button,
  Grid,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { money } from 'common/util/money'
import { stripeFeeCalculator } from 'components/client/one-time-donation/helpers/stripe-fee-calculator'

import { StripeChargeResponse, TPaymentResponse } from 'gql/donations'
import React from 'react'
import { useTranslation } from 'next-i18next'
import { useCreatePaymentFromStripeMutation } from 'service/donation'
import Stripe from 'stripe'
import { AlertStore } from 'stores/AlertStore'
import { ApiError } from 'service/apiErrors'
import { ModalStore } from '../../PaymentsPage'

type CreateUpdatePaymentFromStripeChargeProps = {
  data: StripeChargeResponse
  id: string
}

export function CreatePaymentFromStripeChargeTable({
  data,
  id,
}: CreateUpdatePaymentFromStripeChargeProps) {
  const { t } = useTranslation()
  const { hideImport } = ModalStore
  const stripeMutation = useMutation<
    AxiosResponse<TPaymentResponse>,
    AxiosError<ApiError>,
    Stripe.Charge
  >({
    mutationFn: useCreatePaymentFromStripeMutation(),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.success'), 'success')
      hideImport()
    },
    onError: (error: AxiosError<ApiError>) => {
      AlertStore.show(error.message, 'error')
    },
  })

  const handleSubmit = () => {
    stripeMutation.mutate(data.stripe)
  }

  const stripeStatus = data.stripe.refunded ? 'refund' : data.stripe.status

  return (
    <Grid container direction={'column'} gap={2} justifyContent={'center'}>
      <Grid item xs={12}>
        <Typography variant="h3" fontSize={12}>
          Намерено плащане
        </Typography>
      </Grid>
      <Grid item>
        <Typography fontSize={16} sx={{ wordBreak: 'break-all', width: 600 }}>
          Плащане с номер{' '}
          <Grid component="span" fontWeight={600}>
            {id}
          </Grid>{' '}
          беше намерено. Желате ли да синхронизирате вътрешните данни със Страйп?
        </Typography>
      </Grid>
      <Grid item>
        <TableContainer>
          <TableHead>
            <TableCell />
            <TableCell>База данни на Страйп</TableCell>
            <TableCell>Вътрена база данни</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell>{t('profile:donations.status.' + stripeStatus)}</TableCell>
            <TableCell>
              {data.internal?.status
                ? t('profile:donations.status.' + data.internal?.status)
                : 'N/A'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Сума(бруто)</TableCell>
            <TableCell>{money(data.stripe.amount)}</TableCell>
            <TableCell>{money(data.internal?.chargedAmount ?? 0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Сума(нето)</TableCell>
            <TableCell>
              {money(data.stripe.amount - stripeFeeCalculator(data.stripe.amount, data.region))}
            </TableCell>
            <TableCell>{money(data.internal?.amount ?? 0)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Дарител(име)</TableCell>
            <TableCell>{data.stripe.billing_details.name}</TableCell>
            <TableCell>{data.internal?.billingName ?? 'N/A'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Дарител(емайл)</TableCell>
            <TableCell>{data.stripe.billing_details.email}</TableCell>
            <TableCell>{data.internal?.billingEmail ?? 'N/A'}</TableCell>
          </TableRow>
        </TableContainer>
      </Grid>
      <Button variant="contained" onClick={() => handleSubmit()}>
        Синхронизиране
      </Button>
    </Grid>
  )
}
