import React from 'react'
import { Box, Typography } from '@mui/material'
import { i18n } from 'next-i18next'
import { moneyPublic } from 'common/util/money'
import { convertEurToBgn, CURRENCY_DIVISION_FACTOR } from 'common/util/currencyConversion'

interface DualCurrencyAmountProps {
  amount: number
  currency?: string
  divisionFactor?: number
  showDualCurrency?: boolean
  primaryFontSize?: number | string
  secondaryFontSize?: number | string
  fontWeight?: number
}

/**
 * Component to display amount with optional dual currency (EUR + BGN)
 * The secondary currency is displayed in a smaller font to prevent layout issues
 */
export default function DualCurrencyAmount({
  amount,
  currency = 'EUR',
  divisionFactor = CURRENCY_DIVISION_FACTOR,
  showDualCurrency = false,
  primaryFontSize = 22,
  secondaryFontSize = 16,
  fontWeight = 600,
}: DualCurrencyAmountProps) {
  // Get primary currency formatted
  const primaryFormatted = moneyPublic(amount, currency, divisionFactor, 2, 2)

  // If dual currency not enabled or already in BGN, return primary only
  if (!showDualCurrency || currency === 'BGN' || currency !== 'EUR') {
    return (
      <Typography fontSize={primaryFontSize} fontWeight={fontWeight}>
        {primaryFormatted}
      </Typography>
    )
  }

  // Convert to BGN
  const amountInPrimaryCurrency = amount / divisionFactor
  const convertedAmount = convertEurToBgn(amountInPrimaryCurrency)

  // Format BGN amount according to locale
  const locale = i18n?.language || 'bg-BG'
  const bgnFormatted = new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(convertedAmount)

  // Use locale-appropriate BGN symbol
  const bgnSymbol = locale.startsWith('bg') ? 'лв.' : 'BGN'

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
      <Typography fontSize={primaryFontSize} fontWeight={fontWeight}>
        {primaryFormatted}
      </Typography>
      <Typography
        fontSize={secondaryFontSize}
        fontWeight={400}
        sx={{ color: 'text.secondary', lineHeight: 1.2 }}>
        (~{bgnFormatted} {bgnSymbol})
      </Typography>
    </Box>
  )
}

