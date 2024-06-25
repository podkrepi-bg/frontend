import { Box, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useContext } from 'react'
import { SelectedPaymentSource } from '../store/createPaymentStepReducer'
import { PaymentContext } from '../store/CreatePaymentContext'

export default function PaymentTypeSelector() {
  const paymentContext = useContext(PaymentContext)
  const { t } = useTranslation('')
  const handleSubmit = (source: SelectedPaymentSource) => {
    paymentContext.dispatch({ type: 'UPDATE_PAYMENT_SOURCE', payload: source })
  }
  return (
    <>
      <Typography variant="h6" component={'h2'} sx={{ marginBottom: '16px', textAlign: 'center' }}>
        Ръчно добавяне на плащане
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '16px', textAlign: 'center' }}>
        {t('')} <b />
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 2 }}>
        <Button variant="outlined" onClick={() => handleSubmit('stripe')}>
          През Stripe
        </Button>
        <Button variant="outlined" onClick={() => handleSubmit('benevity')}>
          През Benevity
        </Button>
      </Box>
    </>
  )
}
