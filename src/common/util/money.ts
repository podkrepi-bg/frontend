import { i18n } from 'next-i18next'
import { convertEurToBgn, CURRENCY_DIVISION_FACTOR } from './currencyConversion'

/**
 * Format money amounts
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns string
 */
export const money = (number: number, currency = 'EUR', divisionFactor = 100) => {
  const locale = i18n?.language || 'bg-BG'

  // For Bulgarian locale, use custom formatting for EUR to show "евро"
  if ((locale === 'bg' || locale === 'bg-BG') && currency === 'EUR') {
    const amount = new Intl.NumberFormat('bg-BG', {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(number / divisionFactor)
    return `${amount} евро`
  }

  // For English locale, use custom formatting for EUR to show "EUR"
  if (currency === 'EUR') {
    const amount = new Intl.NumberFormat(locale, {
      style: 'decimal',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(number / divisionFactor)
    return `${amount} EUR`
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    number / divisionFactor,
  )
}

export const moneyPublic = (
  number: number,
  currency = 'EUR',
  divisionFactor = 100,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
): string => {
  if (!i18n?.language || i18n?.language === 'bg' || i18n?.language === 'bg-BG') {
    const amount = new Intl.NumberFormat('bg-BG', {
      style: 'decimal',
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(number / divisionFactor)

    if (currency === 'EUR') {
      return `${amount} евро`
    }
    if (currency === 'USD') {
      return `${amount} $`
    }
    if (currency === 'BGN') {
      return `${amount} лв.`
    }
    return `${amount} ${currency}`
  }

  // For English locale, use custom formatting for EUR to show "EUR" instead of "€"
  if (currency === 'EUR') {
    const amount = new Intl.NumberFormat(i18n?.language, {
      style: 'decimal',
      maximumFractionDigits,
      minimumFractionDigits,
    }).format(number / divisionFactor)
    return `${amount} EUR`
  }

  return new Intl.NumberFormat(i18n?.language, {
    style: 'currency',
    currency,
    maximumFractionDigits,
    minimumFractionDigits,
  }).format(number / divisionFactor)
}

export const moneyPublicDecimals2 = (number: number, currency = 'EUR', divisionFactor = 100) => {
  return moneyPublic(number, currency, divisionFactor, 2, 2)
}

/**
 * Used for formatting a number into internal Money value
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns number
 */

export const toMoney = (number: number, divisionFactor = 100): number => {
  return number * divisionFactor
}

/**
 * Used for formatting Money to a number for display
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns number
 */
export const fromMoney = (number: number, divisionFactor = 100): number => {
  return number / divisionFactor
}

/**
 * Format money with dual currency display
 * Shows primary currency with BGN conversion in parentheses
 *
 * @param number - Amount in smallest unit (e.g., cents)
 * @param currency - Primary currency code
 * @param divisionFactor - Division factor (default CURRENCY_DIVISION_FACTOR)
 * @param showDualCurrency - Whether to show dual currency format
 * @param maximumFractionDigits - Maximum fraction digits (default 2)
 * @param minimumFractionDigits - Minimum fraction digits (default 2)
 * @returns Formatted string like "100.00 EUR (~195.58 BGN)" or "100,00 евро (~195,58 лв.)"
 */
export const moneyPublicDual = (
  number: number,
  currency = 'EUR',
  divisionFactor = CURRENCY_DIVISION_FACTOR,
  showDualCurrency = false,
  maximumFractionDigits = 2,
  minimumFractionDigits = 2,
): string => {
  // Get primary currency formatted
  const primaryFormatted = moneyPublic(
    number,
    currency,
    divisionFactor,
    maximumFractionDigits,
    minimumFractionDigits,
  )

  // If dual currency not enabled or already in BGN, return primary only
  if (!showDualCurrency || currency === 'BGN') {
    return primaryFormatted
  }

  // Only support EUR to BGN conversion for now
  if (currency !== 'EUR') {
    return primaryFormatted
  }

  // Convert to BGN
  const amountInPrimaryCurrency = number / divisionFactor
  const convertedAmount = convertEurToBgn(amountInPrimaryCurrency)

  // Format BGN amount according to locale
  const locale = i18n?.language || 'bg-BG'
  const bgnFormatted = new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(convertedAmount)

  // Use locale-appropriate BGN symbol
  // Bulgarian: "лв." (leva symbol)
  // English and others: "BGN" (ISO code)
  const bgnSymbol = locale.startsWith('bg') ? 'лв.' : 'BGN'

  // Return dual format
  return `${primaryFormatted} (~${bgnFormatted} ${bgnSymbol})`
}

/**
 * Shorthand for moneyPublicDual with 2 decimal places
 */
export const moneyPublicDualDecimals2 = (
  number: number,
  currency = 'EUR',
  divisionFactor = CURRENCY_DIVISION_FACTOR,
  showDualCurrency = false,
) => {
  return moneyPublicDual(number, currency, divisionFactor, showDualCurrency, 2, 2)
}
