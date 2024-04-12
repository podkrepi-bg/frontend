import React from 'react'
import { useTranslation } from 'react-i18next'
import { Info } from '@mui/icons-material'
import { Alert, Box, BoxProps, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import theme from 'common/theme'
import { moneyPublicDecimals2 } from 'common/util/money'
import { stripeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { CardRegion } from 'gql/donations.enums'
import { useFormikContext } from 'formik'
import { DonationFormData } from '../helpers/types'

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
  const { t } = useTranslation('donation-flow')
  const formik = useFormikContext<DonationFormData>()
  const feeAmount =
    donationAmount !== 0
      ? stripeFeeCalculator(donationAmount, formik.values.cardRegion as CardRegion)
      : donationAmount

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
          <StyledTypography>{t('step.summary.donation')}: </StyledTypography>
          <StyledTypography>{moneyPublicDecimals2(donationAmount - feeAmount)}</StyledTypography>
        </Stack>

        <Stack direction={'row'} justifyContent="space-between">
          <StyledTypography>
            {t('step.summary.transaction.title')}
            <Tooltip title={t('step.summary.transaction.description')}>
              <IconButton sx={{ padding: '5px', height: 30, width: 30 }}>
                <Info sx={{ height: 20, width: 20 }} />
              </IconButton>
            </Tooltip>
            :{' '}
          </StyledTypography>
          <StyledTypography>{moneyPublicDecimals2(feeAmount)}</StyledTypography>
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
          <StyledTypography>{t('step.summary.total')}: </StyledTypography>
          <StyledTypography data-testid="total-amount">
            {moneyPublicDecimals2(donationAmount)}
          </StyledTypography>
        </Stack>
      </Alert>
    </Box>
  )
}

export default PaymentSummaryAlert
