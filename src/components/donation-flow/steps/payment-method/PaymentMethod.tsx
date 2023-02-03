import React from 'react'
import { Alert, Box, Collapse, Typography, useMediaQuery } from '@mui/material'
import { useField } from 'formik'

import theme from 'common/theme'
import { DonationFormPaymentMethod } from 'components/donation-flow/helpers/types'

import { TaxesCheckbox } from './TaxesCheckbox'
import RadioCardGroup from '../../common/RadioCardGroup'
import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import CardIcon from '../../icons/CardIcon'
import BankIcon from '../../icons/BankIcon'
import PaymentDetailsStripeForm from './PaymentDetailsStripeForm'
import BankPayment from './BankPayment'

export default function PaymentMethod({
  sectionRef,
}: {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
}) {
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const [payment] = useField('payment')
  const options = [
    {
      value: 'card',
      label: 'Card',
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
    },
  ]
  const cardAlertDescription = `Таксата на Stripe се изчислява според района на картодържателя: 1.2% + 0.5лв. за Европейската икономическа зона`
  const bankAlertDescription = `Таксата за транзакция при банков превод зависи от индивидуалните условия на Вашата банка. от (0-4лв)`

  const paymentMethodAlertMap = {
    [DonationFormPaymentMethod.CARD]: cardAlertDescription,
    [DonationFormPaymentMethod.BANK]: bankAlertDescription,
  }

  const mobileOptions = [
    {
      value: 'card',
      label: 'Card',
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      content: (
        <Box>
          <Alert sx={{ mt: 1, mb: 2, mx: -2 }} color="info" icon={false}>
            <Typography>
              {paymentMethodAlertMap[payment.value as DonationFormPaymentMethod]}
            </Typography>
          </Alert>
          <PaymentDetailsStripeForm />
        </Box>
      ),
    },
    {
      value: 'bank',
      label: 'Bank Transfer',
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
      content: (
        <Box>
          <Alert sx={{ my: 2, mx: -2 }} color="info" icon={false}>
            <Typography>
              {paymentMethodAlertMap[payment.value as DonationFormPaymentMethod]}
            </Typography>
          </Alert>
          <BankPayment />
        </Box>
      ),
    },
  ]
  return (
    <Box ref={sectionRef} component="section" id="select-payment-method">
      <Typography mb={3} variant="h5">
        Как желаете да дарите?
      </Typography>
      {isSmall ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <>
          <RadioCardGroup columns={2} name="payment" options={options} />
          <Collapse in={payment.value === DonationFormPaymentMethod.CARD}>
            <PaymentDetailsStripeForm containerProps={{ sx: { my: 3 } }} />
            <TaxesCheckbox />
          </Collapse>
          <Collapse in={payment.value === DonationFormPaymentMethod.BANK}>
            <BankPayment />
          </Collapse>
        </>
      )}
    </Box>
  )
}
