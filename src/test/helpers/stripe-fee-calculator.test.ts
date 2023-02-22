import { CardRegion } from 'gql/donations.enums'
import {
  stripeFeeCalculator,
  stripeIncludeFeeCalculator,
} from 'components/client/one-time-donation/helpers/stripe-fee-calculator'

describe("Calculating total charged amount with Stripe's fee included", () => {
  //Total amount of donation in stotinki, BGN 1 = 100 stotinki
  const donationAmount = 2000

  test('Calculating total charge for EU issued cards', () => {
    const totalCharge = stripeIncludeFeeCalculator(donationAmount, CardRegion.EU) / 100
    const formattedResult = totalCharge.toFixed(2)
    expect(formattedResult).toMatch('20.75')
  })

  test('Calculating total charge for UK issued cards', () => {
    const totalCharge = stripeIncludeFeeCalculator(donationAmount, CardRegion.UK) / 100
    const formattedResult = totalCharge.toFixed(2)
    expect(formattedResult).toMatch('21.03')
  })

  test('Calculating total charge for Other issued cards', () => {
    const totalCharge = stripeIncludeFeeCalculator(donationAmount, CardRegion.Other) / 100
    const formattedResult = totalCharge.toFixed(2)
    expect(formattedResult).toMatch('21.11')
  })
})

describe("Calculating Stripe's fee for different regions", () => {
  //Total amount of donation in stotinki, BGN 1 = 100 stotinki
  const donationAmount = 2000

  test("Calculating Stripe's fee for EU issued cards", () => {
    const stripeFee = stripeFeeCalculator(donationAmount, CardRegion.EU) / 100
    const formattedResult = stripeFee.toFixed(2)
    expect(formattedResult).toMatch('0.74')
  })

  test("Calculating Stripe's fee for UK issued cards", () => {
    const stripeFee = stripeFeeCalculator(donationAmount, CardRegion.UK) / 100
    const formattedResult = stripeFee.toFixed(2)
    expect(formattedResult).toMatch('1.00')
  })

  test("Calculating Stripe's fee for Other issued cards", () => {
    const stripeFee = stripeFeeCalculator(donationAmount, CardRegion.Other) / 100
    const formattedResult = stripeFee.toFixed(2)
    expect(formattedResult).toMatch('1.08')
  })
})
