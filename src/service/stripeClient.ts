import getConfig from 'next/config'
import { loadStripe } from '@stripe/stripe-js'
const {
  publicRuntimeConfig: { STRIPE_PUBLISHABLE_KEY },
} = getConfig()

export const stripe = loadStripe(STRIPE_PUBLISHABLE_KEY)
