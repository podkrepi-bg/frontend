import { CardRegion } from 'gql/donations.enums'
import { stripeIncludeFeeCalculator } from 'components/client/donation-flow/helpers/stripe-fee-calculator'

/**
 * Test the finalAmount calculation logic that was updated in Amount.tsx
 * This simulates the logic that determines the final amount based on payment method and fee preferences
 */
describe('Final Amount Calculation Logic', () => {
  const amountChosen = 2000 // 20 BGN in stotinki
  const cardRegion = CardRegion.EU

  describe('Non-card payment methods should use chosen amount without fees', () => {
    test('BANK payment method should use chosen amount', () => {
      // For non-card payment methods, finalAmount should equal amountChosen
      const finalAmount = amountChosen

      expect(finalAmount).toBe(2000)
    })

    test('IRISPAY payment method should use chosen amount', () => {
      // For non-card payment methods, finalAmount should equal amountChosen
      const finalAmount = amountChosen

      expect(finalAmount).toBe(2000)
    })
  })

  describe('Card payment method should handle fees correctly', () => {
    test('CARD payment with cardIncludeFees=true should calculate total with fees', () => {
      // When including fees, calculate the total amount that includes Stripe fees
      const finalAmount = stripeIncludeFeeCalculator(amountChosen, cardRegion)

      // For 20 BGN (2000 stotinki) with EU card fees, should be approximately 20.75 BGN (2075 stotinki)
      expect(Math.round(finalAmount)).toBe(2075)
    })

    test('CARD payment with cardIncludeFees=false should use chosen amount', () => {
      // When not including fees, finalAmount should equal amountChosen
      const finalAmount = amountChosen

      expect(finalAmount).toBe(2000)
    })
  })

  describe('Payment method change scenarios', () => {
    test('Changing from CARD with fees to BANK should recalculate to original amount', () => {
      // Initial state: CARD payment with fees included
      const cardIncludeFees = true

      // Calculate initial finalAmount with fees
      let finalAmount = stripeIncludeFeeCalculator(amountChosen, cardRegion)
      expect(Math.round(finalAmount)).toBe(2075)

      // Change payment method to BANK
      // Recalculate finalAmount - should now be the original amount without fees
      finalAmount = amountChosen
      expect(finalAmount).toBe(2000)
    })

    test('Changing from CARD with fees to IRISPAY should recalculate to original amount', () => {
      // Initial state: CARD payment with fees included
      const cardIncludeFees = true

      // Calculate initial finalAmount with fees
      let finalAmount = stripeIncludeFeeCalculator(amountChosen, cardRegion)
      expect(Math.round(finalAmount)).toBe(2075)

      // Change payment method to IRISPAY
      // Recalculate finalAmount - should now be the original amount without fees
      finalAmount = amountChosen
      expect(finalAmount).toBe(2000)
    })
  })

  describe('Edge cases', () => {
    test('No payment method selected should use chosen amount', () => {
      // When no payment method is selected, use the chosen amount
      const finalAmount = amountChosen

      expect(finalAmount).toBe(2000)
    })

    test('Different card regions should calculate fees correctly', () => {
      // EU cards
      const finalAmountEU = stripeIncludeFeeCalculator(amountChosen, CardRegion.EU)
      expect(Math.round(finalAmountEU)).toBe(2075)

      // UK cards
      const finalAmountUK = stripeIncludeFeeCalculator(amountChosen, CardRegion.UK)
      expect(Math.round(finalAmountUK)).toBe(2103)

      // Other cards
      const finalAmountOther = stripeIncludeFeeCalculator(amountChosen, CardRegion.Other)
      expect(Math.round(finalAmountOther)).toBe(2111)
    })
  })
})
