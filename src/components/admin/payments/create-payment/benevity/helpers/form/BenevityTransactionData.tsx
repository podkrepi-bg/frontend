import { Grid, Typography } from '@mui/material'
import React from 'react'
import { BenevityInput } from '../../BenevityEditableInput'
import { ExchangeRate } from './ExchangeRate'
import { Currency } from 'gql/currency'

type BenevityTransactionDataProps = {
  sentCurrency: string
  receivedCurrency: Currency
  exchangeRate: number
}
export default function BenevityTransactionData({
  receivedCurrency,
  sentCurrency,
  exchangeRate,
}: BenevityTransactionDataProps) {
  return (
    <>
      <Grid item display={'flex'} gap={1} alignItems={'center'}>
        <Typography fontSize={17}>Получени средства(BGN):</Typography>
        <BenevityInput name="amount" suffix={receivedCurrency} />
      </Grid>
      <Grid item display={'flex'} gap={1} alignItems={'center'}>
        <Typography fontSize={17}>Превод валута:</Typography>
        <BenevityInput name="currency" canEdit={true} />
      </Grid>
      <Grid item display={'flex'} gap={1} alignItems={'center'}>
        <Typography fontSize={17}>Изпратени средства(Нето):</Typography>
        <BenevityInput name="benevityData.netTotalPayment" suffix={sentCurrency} canEdit={true} />
      </Grid>
      <ExchangeRate exchangeRate={exchangeRate} />
    </>
  )
}
