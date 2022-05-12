import { i18n } from 'next-i18next'

/**
 * Format money amounts
 *
 * @param number number
 * @param currency string
 * @param divisionFactor number @default 100
 * @returns string
 */
export const money = (number: number, currency = 'BGN', divisionFactor = 100) => {
  return new Intl.NumberFormat(i18n?.language || 'bg-BG', { style: 'currency', currency }).format(
    number / divisionFactor,
  )
}
