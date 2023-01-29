import { Alert, Box, Stack, Typography } from '@mui/material'
import theme from 'common/theme'
import { moneyPublicDecimals2, toMoney } from 'common/util/money'
import { stripeFeeCalculator } from 'components/one-time-donation/helpers/stripe-fee-calculator'
import { CardRegion } from 'gql/donations.enums'
import React from 'react'

function PaymentSummaryAlert({ donationAmount }: { donationAmount: number }) {
  const fullAmount = donationAmount + stripeFeeCalculator(donationAmount, CardRegion.EU)
  return (
    <Box
      sx={{
        borderRadius: theme.borders.semiRound,
        border: `1px solid ${theme.palette.primary.dark}`,
      }}>
      <Box
        sx={{
          p: 3,
        }}>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography>Дарение: </Typography>
          <Typography>{moneyPublicDecimals2(donationAmount)}</Typography>
        </Stack>

        <Stack direction={'row'} justifyContent="space-between">
          <Typography>Трансакция: </Typography>
          <Typography>{moneyPublicDecimals2(fullAmount - donationAmount)}</Typography>
        </Stack>
      </Box>
      <Alert
        sx={{
          borderBottomLeftRadius: theme.borders.semiRound,
          borderBottomRightRadius: theme.borders.semiRound,
          py: 1,
          px: 3,
        }}
        color="info"
        icon={false}>
        <Stack direction={'row'} justifyContent="space-between">
          <Typography>Общо: </Typography>
          <Typography>{moneyPublicDecimals2(fullAmount)}</Typography>
        </Stack>
      </Alert>
    </Box>
  )
}

export default PaymentSummaryAlert
