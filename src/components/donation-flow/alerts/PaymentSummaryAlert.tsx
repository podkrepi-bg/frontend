import { Info } from '@mui/icons-material'
import { Alert, Box, BoxProps, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import theme from 'common/theme'
import { moneyPublicDecimals2 } from 'common/util/money'
import { stripeFeeCalculator } from 'components/one-time-donation/helpers/stripe-fee-calculator'
import { CardRegion } from 'gql/donations.enums'
import React from 'react'

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
}))

function PaymentSummaryAlert({
  donationAmount,
  sx,
  boxProps,
}: {
  donationAmount: number
  sx?: BoxProps['sx']
  boxProps?: BoxProps
}) {
  const fullAmount =
    donationAmount !== 0 ? donationAmount + stripeFeeCalculator(donationAmount, CardRegion.EU) : 0
  return (
    <Box
      sx={{
        borderRadius: theme.borders.semiRound,
        border: `1px solid ${theme.palette.primary.dark}`,
        ...sx,
      }}
      {...boxProps}>
      <Box
        sx={{
          py: 2,
          px: 3,
        }}>
        <Stack direction={'row'} justifyContent="space-between">
          <StyledTypography>Дарение: </StyledTypography>
          <StyledTypography>{moneyPublicDecimals2(donationAmount)}</StyledTypography>
        </Stack>

        <Stack direction={'row'} justifyContent="space-between">
          <StyledTypography>
            Трансакция
            <Tooltip title="Таксите отнасящи се към трансакцията">
              <IconButton sx={{ padding: '5px', height: 30, width: 30 }}>
                <Info sx={{ height: 20, width: 20 }} />
              </IconButton>
            </Tooltip>
            :{' '}
          </StyledTypography>
          <StyledTypography>{moneyPublicDecimals2(fullAmount - donationAmount)}</StyledTypography>
        </Stack>
      </Box>
      <Alert
        sx={{
          display: 'block',
          borderBottomLeftRadius: theme.borders.semiRound,
          borderBottomRightRadius: theme.borders.semiRound,
          borderTop: `1px solid ${theme.palette.primary.dark}`,
          py: 1,
          px: 3,
        }}
        color="info"
        icon={false}>
        <Stack direction={'row'} justifyContent="space-between">
          <StyledTypography>Общо: </StyledTypography>
          <StyledTypography>{moneyPublicDecimals2(fullAmount)}</StyledTypography>
        </Stack>
      </Alert>
    </Box>
  )
}

export default PaymentSummaryAlert
