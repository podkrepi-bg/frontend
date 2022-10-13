import { useEffect } from 'react'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Box, Typography } from '@mui/material'

export type PaypalButtonWrapperOptions = {
  campaignId: string
  amount: number
  currency: string
}

// Custom component to wrap the PayPalButtons and handle amount&currency changes
export default function PaypalButtonsWrapper({
  campaignId,
  amount,
  currency,
}: PaypalButtonWrapperOptions) {
  // usePayPalScriptReducer can be used only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  useEffect(() => {
    dispatch({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    })
  }, [amount, currency])

  return (
    <Box minHeight={50}>
      {isPending ? <div className="spinner" /> : null}
      <PayPalButtons
        fundingSource="paypal"
        style={{ layout: 'vertical', color: 'gold', shape: 'pill' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                },
                custom_id: campaignId, // Paypal will send this in the webhook too
                description: 'donation for campaign:' + campaignId,
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          if (actions.order) {
            //TODO: send capture to backend

            return actions.order.capture().then((details) => {
              const name = details?.payer?.name?.given_name
              alert(`Transaction completed by ${name}`)
            })
          } else {
            return new Promise(() => {
              alert(`Transaction failed for orderId: ` + data.orderID)
            })
          }
        }}
      />
    </Box>
  )
}
