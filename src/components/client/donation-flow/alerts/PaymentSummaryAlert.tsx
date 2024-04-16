import React from 'react'
import { useTranslation } from 'next-i18next'
import { Info } from '@mui/icons-material'
import { BoxProps, IconButton, Tooltip, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import theme from 'common/theme'
import { moneyPublicDecimals2 } from 'common/util/money'
import { stripeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { CardRegion } from 'gql/donations.enums'
import { useFormikContext } from 'formik'
import { DonationFormData } from '../helpers/types'
import Grid2 from '@mui/material/Unstable_Grid2'

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(22),
  fontWeight: 600,
}))

function PaymentSummaryAlert({
  donationAmount,
  sx,
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
    <Grid2
      container
      xs={12}
      direction={'column'}
      sx={{
        borderRadius: 8,
        border: `1px solid ${theme.palette.primary.dark}`,
        overflow: 'hidden',
        ...sx,
      }}>
      <Grid2
        sx={{
          py: 2,
          px: 3,
          flex: 2,
        }}>
        <Grid2 container direction={'row'} justifyContent={'space-between'} gap={2}>
          <Typography fontSize={theme.typography.pxToRem(22)} fontWeight={600}>
            {t('step.summary.donation')}:{' '}
          </Typography>
          <Typography fontSize={theme.typography.pxToRem(22)} fontWeight={600}>
            {moneyPublicDecimals2(donationAmount - feeAmount)}
          </Typography>
        </Grid2>

        <Grid2 container direction={'row'} justifyContent={'space-between'}>
          <Typography fontSize={theme.typography.pxToRem(22)} fontWeight={600}>
            {t('step.summary.transaction.title')}
            <Tooltip title={t('step.summary.transaction.description')}>
              <IconButton sx={{ padding: '5px', height: 30, width: 30 }}>
                <Info sx={{ height: 20, width: 20 }} />
              </IconButton>
            </Tooltip>
            :{' '}
          </Typography>
          <Typography fontSize={theme.typography.pxToRem(22)} fontWeight={600}>
            {moneyPublicDecimals2(feeAmount)}
          </Typography>
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction={'row'}
        justifyContent="space-between"
        sx={{
          borderTop: `1px solid ${theme.palette.primary.dark}`,
          backgroundColor: '#CBE9FE',
          py: 1,
          px: 3,
          // flex: 1,
        }}>
        <Typography fontSize={theme.typography.pxToRem(22)} fontWeight={600}>
          {t('step.summary.total')}:{' '}
        </Typography>
        <Typography
          fontSize={theme.typography.pxToRem(22)}
          fontWeight={600}
          data-testid="total-amount">
          {moneyPublicDecimals2(donationAmount)}
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default PaymentSummaryAlert
