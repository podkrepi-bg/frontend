import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Alert, Box, Collapse, Typography, useMediaQuery } from '@mui/material'
import { useField } from 'formik'

import theme from 'common/theme'
import { DonationFormPaymentMethod } from 'components/client/donation-flow/helpers/types'

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
  const { t } = useTranslation('donation-flow')
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const [payment] = useField('payment')
  const { status } = useSession()
  const options = [
    {
      value: 'card',
      label: t('step.payment-method.field.method.card'),
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
    },
    {
      value: 'bank',
      label: t('step.payment-method.field.method.bank'),
      icon: <BankIcon sx={{ width: 80, height: 80 }} />,
    },
  ]
  const cardAlertDescription = t('step.payment-method.alert.card-fee')
  const bankAlertDescription = t('step.payment-method.alert.bank-fee')

  const paymentMethodAlertMap = {
    [DonationFormPaymentMethod.CARD]: cardAlertDescription,
    [DonationFormPaymentMethod.BANK]: bankAlertDescription,
  }

  const mobileOptions = [
    {
      value: 'card',
      label: t('step.payment-method.field.method.card'),
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      content: (
        <Box>
          <Alert sx={{ mt: 1, mb: 2, mx: -2 }} color="info" icon={false}>
            <Typography>
              {paymentMethodAlertMap[payment.value as DonationFormPaymentMethod]}
            </Typography>
          </Alert>
          <PaymentDetailsStripeForm />
          <TaxesCheckbox />
        </Box>
      ),
    },
    {
      value: 'bank',
      label: t('step.payment-method.field.method.bank'),
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
        {t('step.payment-method.title')}?
      </Typography>
      {isSmall ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <>
          <RadioCardGroup
            loading={status === 'loading'}
            columns={2}
            name="payment"
            options={options}
          />
          <Collapse unmountOnExit in={payment.value === DonationFormPaymentMethod.CARD}>
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
