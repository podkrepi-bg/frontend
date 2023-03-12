import { useEffect } from 'react'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { Box } from '@mui/material'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'

export type PaypalDonationButtonOptions = {
  campaignId: string
  amount: number
  currency: string
}

// Custom component to wrap the PayPalButtons and handle amount&currency changes
export default function PaypalDonationButton({
  campaignId,
  amount,
  currency,
}: PaypalDonationButtonOptions) {
  // usePayPalScriptReducer can be used only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

  const { t } = useTranslation('one-time-donation')

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
        style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'donate' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount.toString(),
                  currency_code: currency,
                  breakdown: {
                    item_total: {
                      currency_code: currency,
                      value: amount.toString(),
                    },
                  },
                },
                custom_id: campaignId, // Paypal will send this in the webhook too
                description: 'donation for campaign: ' + campaignId,
                items: [
                  {
                    category: 'DONATION',
                    name: 'Име на кампания',
                    description: 'Дарение за кампания',
                    quantity: '1',
                    unit_amount: {
                      currency_code: currency,
                      value: amount.toString(),
                    },
                  },
                ],
              },
            ],
          })
        }}
        onApprove={(data, actions) => {
          if (actions.order) {
            return actions.order.capture().then(() => {
              AlertStore.show(t('alerts.success'), 'success')
            })
          } else {
            return new Promise(() => {
              AlertStore.show(t('alerts.error'), 'error')
            })
          }
        }}
      />
    </Box>
  )
}
