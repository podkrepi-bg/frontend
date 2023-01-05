import React, { PropsWithChildren } from 'react'

const DonationFlowContext = React.createContext({
  stripePaymentIntentId: null,
})

export const DonationFlowProvider = ({ children }: PropsWithChildren) => {
  const [stripePaymentIntentId, setStripePaymentIntentId] = React.useState(null)
  const value = { stripePaymentIntentId, setStripePaymentIntentId }
  return <DonationFlowContext.Provider value={value}>{children}</DonationFlowContext.Provider>
}
