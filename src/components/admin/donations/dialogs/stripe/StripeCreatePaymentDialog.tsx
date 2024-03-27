import {
  Button,
  Grid,
  Tab,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { money } from 'common/util/money'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { useField } from 'formik'
import { TPaymentResponse } from 'gql/donations'
import { PaymentStatus } from 'gql/donations.enums'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

type Reference = {
  netAmount: number
  status: PaymentStatus
}

type GetStripeChargeResponse = {
  stripe: Reference
  internal: Reference
}

function useGetStripeChargeFromPID(stripeId: string) {
  return useQuery<GetStripeChargeResponse>([
    endpoints.payments.referenceStripeWithInternal(stripeId).url,
  ])
}

type SynchronizeStripeWithInternalProps = {
  data: GetStripeChargeResponse
  id: string
}

type SynchronizeWithStripeInput = {
  id: string
  stripe: Reference
  internal: Reference
}

function synchronizeWithStrip(data: any) {
  return apiClient.patch(endpoints.payments.synchronizeWithStripe(data.id).url, data)
}

const useSynchronizeWithStripeMutation = () => {
  return useMutation<AxiosResponse<TPaymentResponse>, unknown, SynchronizeWithStripeInput>(
    [endpoints.payments.synchronizeWithStripe],
    { mutationFn: synchronizeWithStrip },
  )
}

function SynchronizeStripeWithInternal({ data, id }: SynchronizeStripeWithInternalProps) {
  const { t } = useTranslation()
  const stripeMutation = useSynchronizeWithStripeMutation()
  const handleSubmit = () => {
    const mutateData: SynchronizeWithStripeInput = {
      id: id,
      ...data,
    }
    stripeMutation.mutate(mutateData)
  }
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
            <TableCell></TableCell>
            <TableCell>База данни на Страйп</TableCell>
            <TableCell>Вътрещна база данни</TableCell>
          </TableHead>
          <TableRow>
            <TableCell>Сума</TableCell>
            <TableCell>{money(data.stripe.netAmount)}</TableCell>
            <TableCell>{money(data.internal.netAmount)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell>{t('profile:donations.status.' + data.stripe.status)}</TableCell>
            <TableCell>{t('profile:donations.status.' + data.internal.status)}</TableCell>
          </TableRow>
        </TableContainer>
      </Grid>
      <Button variant="contained" onClick={handleSubmit}>
        Синхронизиране
      </Button>
    </Grid>
  )
}

export default function StripeCreatePaymentDialog() {
  const [field] = useField('extPaymentIntentId')
  const data = useGetStripeChargeFromPID(field.value)
  if (data.isLoading) return <CenteredSpinner />
  if (data.isError) return
  return <SynchronizeStripeWithInternal data={data.data} id={field.value} />
}
