/**
 * Currency conversion utilities
 * Handles conversion between EUR and BGN
 */

export interface ConversionRate {
  from: string
  to: string
  rate: number
  lastUpdated?: Date
}

// Static rate as fallback (BGN is pegged to EUR at ~1.95583)
// This is the official fixed exchange rate set by the Bulgarian National Bank
const STATIC_EUR_TO_BGN_RATE = 1.95583

/**
 * Standard division factor for currency amounts stored in cents
 * Most currencies store amounts as integers (cents) and divide by 100 to get the actual amount
 */
export const CURRENCY_DIVISION_FACTOR = 100

/**
 * Get EUR to BGN conversion rate
 * Can be extended to fetch from API or environment variable in the future
 *
 * @returns The conversion rate from EUR to BGN
 */
export const getEurToBgnRate = (): number => {
  // TODO: In future, fetch from API or environment variable for dynamic rates
  // For now, use static rate since BGN is pegged to EUR at a fixed rate
  return STATIC_EUR_TO_BGN_RATE
}

/**
 * Convert EUR amount to BGN
 *
 * @param eurAmount - Amount in EUR (already divided by divisionFactor)
 * @returns Amount in BGN
 */
export const convertEurToBgn = (eurAmount: number): number => {
  const rate = getEurToBgnRate()
  return eurAmount * rate
}

/**
 * Convert BGN amount to EUR
 *
 * @param bgnAmount - Amount in BGN (already divided by divisionFactor)
 * @returns Amount in EUR
 */
export const convertBgnToEur = (bgnAmount: number): number => {
  const rate = getEurToBgnRate()
  return bgnAmount / rate
}
