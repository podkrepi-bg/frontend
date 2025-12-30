import React from 'react'
import { useTranslation } from 'next-i18next'
import { Info } from '@mui/icons-material'
import { BoxProps, IconButton, Theme, Tooltip, Typography } from '@mui/material'
import theme from 'common/theme'
import { moneyPublicDecimals2 } from 'common/util/money'
import { featureFlagEnabled, Features } from 'common/util/featureFlag'
import { stripeFeeCalculator } from '../helpers/stripe-fee-calculator'
import { CardRegion } from 'gql/donations.enums'
import { useFormikContext } from 'formik'
import { DonationFormData } from '../helpers/types'
import { Grid2 } from '@mui/material'
import DualCurrencyAmount from 'components/common/DualCurrencyAmount'

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
  const dualCurrencyEnabled = featureFlagEnabled(Features.DUAL_CURRENCY)
  const feeAmount =
    donationAmount !== 0
      ? stripeFeeCalculator(donationAmount, formik.values.cardRegion as CardRegion)
      : donationAmount

  return (
    <Grid2
      container
      size={{ xs: 12 }}
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
            <Tooltip
              title={t('step.summary.transaction.description')}
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [20, 10],
                    },
                  },
                ],
              }}
              componentsProps={{
                tooltip: {
                  sx: (theme) => ({
                    backgroundColor: '#CBE9FE',
                    color: theme.palette.text.primary,
                    border: '1px solid #32A9FE',
                    fontSize: (theme as Theme).typography.pxToRem(16),
                    lineHeight: '24px',
                    fontStyle: 'italic',
                    letterSpacing: '0.15px',
                    fontWeight: 400,
                    borderRadius: 6,
                    maxWidth: 297,
                    padding: theme.spacing(1.5),
                    fontFamily: (theme as Theme).typography.fontFamily,
                  }),
                },
                arrow: {
                  sx: {
                    color: '#CBE9FE',
                    fontSize: 50,
                    zIndex: 999,
                    '&:before': {
                      border: '1px solid #32A9FE',
                    },
                  },
                },
              }}
              arrow
              placement="top"
              sx={{ '& .MuiTooltip-arrow': { fontSize: 'large' } }}>
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
        <DualCurrencyAmount
          amount={donationAmount}
          currency="EUR"
          showDualCurrency={dualCurrencyEnabled}
          primaryFontSize={theme.typography.pxToRem(22)}
          secondaryFontSize={theme.typography.pxToRem(14)}
          fontWeight={600}
        />
      </Grid2>
    </Grid2>
  )
}

export default PaymentSummaryAlert
