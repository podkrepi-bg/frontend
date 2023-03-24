import { CardRegion } from 'gql/donations.enums'

/**
 * Calculates total charge amount in stotinki so that donation of netAmount is received after deducting Stripe fees
 * References:
 *   - applied fees https://stripe.com/en-bg/pricing
 *   - formula for including fees: https://support.stripe.com/questions/passing-the-stripe-fee-on-to-customers
 *   - testing with International cards: https://stripe.com/docs/testing#international-cards
 * @param netAmount expected in stotinki
 * @returns
 */
export function stripeIncludeFeeCalculator(netAmount: number, region: CardRegion) {
  switch (region) {
    case CardRegion.EU: {
      return stripeIncludeFeeCalculatorEU(netAmount)
    }
    case CardRegion.UK: {
      return stripeIncludeFeeCalculatorUK(netAmount)
    }
    case CardRegion.Other: {
      return stripeIncludeFeeCalculatorOther(netAmount)
    }
  }
}

export function stripeIncludeFeeCalculatorEU(netAmount: number) {
  return (netAmount + 50) / (1 - 0.012)
}

export function stripeIncludeFeeCalculatorUK(netAmount: number) {
  return (netAmount + 50) / (1 - 0.025)
}

export function stripeIncludeFeeCalculatorOther(netAmount: number) {
  return (netAmount + 50) / (1 - 0.029)
}

/**
 * Calculates Stripe fees based on card region
 * References:
 *   - applied fees https://stripe.com/en-bg/pricing
 *   - formula for including fees: https://support.stripe.com/questions/passing-the-stripe-fee-on-to-customers
 *   - testing with International cards: https://stripe.com/docs/testing#international-cards
 * @param chargedAmount expected in stotinki
 * @returns
 */
export function stripeFeeCalculator(chargedAmount: number, region: CardRegion) {
  switch (region) {
    case CardRegion.EU: {
      return chargedAmount * 0.012 + 50
    }
    case CardRegion.UK: {
      return chargedAmount * 0.025 + 50
    }
    case CardRegion.Other: {
      return chargedAmount * 0.029 + 50
    }
  }
}
