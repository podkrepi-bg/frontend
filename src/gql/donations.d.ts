import { Stripe } from 'stripe'

export type DonationPrice = Stripe.Price

export type CheckoutSessionResponse = {
  session: Stripe.Checkout.Session
}

export type CheckoutSessionInput = {
  mode: Stripe.Checkout.Session.Mode
  priceId: string
  campaignId: string
  successUrl?: string
  cancelUrl?: string
}

export type UserDonation = {
  targetVault: {
    campaign: {
      title: string
    }
  }
  amount: number
  currency: number
  createdAt: string
}
