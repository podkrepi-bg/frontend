import React from 'react'
import { useTranslation } from 'next-i18next'
import { useSession } from 'next-auth/react'
import { Alert, Box, Collapse, Grid, Typography, useMediaQuery } from '@mui/material'
import { useField, useFormikContext } from 'formik'

import theme from 'common/theme'
import {
  DonationFormPaymentMethod,
  PaymentMode,
  DonationFormData,
} from 'components/client/donation-flow/helpers/types'

import { TaxesCheckbox } from './TaxesCheckbox'
import RadioCardGroup from '../../common/RadioCardGroup'
import RadioAccordionGroup from '../../common/RadioAccordionGroup'
import CardIcon from '../../icons/CardIcon'
import BankIcon from '../../icons/BankIcon'
import PaymentDetailsStripeForm from './PaymentDetailsStripeForm'
import BankPayment from './BankPayment'
import { DonationFormSectionErrorText } from '../../common/DonationFormErrors'
import IrisPayIcon from '../../icons/IrisPayIcon'

export default function PaymentMethod({
  sectionRef,
  error,
}: {
  sectionRef: React.MutableRefObject<HTMLDivElement | null>
  error?: boolean
}) {
  const { t } = useTranslation('donation-flow')
  const isSmall = useMediaQuery(theme.breakpoints.down('md'))
  const [payment] = useField('payment')
  const [mode] = useField<PaymentMode>('mode')
  const { status } = useSession()
  const formik = useFormikContext<DonationFormData>()
  const options = [
    {
      value: 'card',
      label: t('step.payment-method.field.method.card'),
      icon: <CardIcon sx={{ width: 80, height: 80, minWidth: 480 }} />,
      disabled: false,
    },
    {
      value: 'bank',
      label: t('step.payment-method.field.method.bank'),
      icon: <BankIcon sx={{ width: 80, height: 80, minWidth: 480 }} />,
      disabled: mode.value === 'subscription',
    },
    {
      value: 'irispay',
      label: t('step.payment-method.field.method.irispay'),
      icon: <IrisPayIcon sx={{ width: 80, height: 80, minWidth: 480 }} />,
      disabled: mode.value === 'subscription',
    },
  ]
  const cardAlertDescription = t('step.payment-method.alert.card-fee')
  const bankAlertDescription = t('step.payment-method.alert.bank-fee')
  const irisPayAlertDescription = t('step.payment-method.alert.irispay-fee')

  const paymentMethodAlertMap = {
    [DonationFormPaymentMethod.CARD]: cardAlertDescription,
    [DonationFormPaymentMethod.BANK]: bankAlertDescription,
    [DonationFormPaymentMethod.IRISPAY]: irisPayAlertDescription,
  }

  const mobileOptions = [
    {
      value: 'card',
      label: t('step.payment-method.field.method.card'),
      icon: <CardIcon sx={{ width: 80, height: 80 }} />,
      content: (
        <Box gap={2}>
          <Alert sx={{ mt: 1, mb: 2 }} color="info" icon={false}>
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
          <Alert sx={{ my: 2 }} color="info" icon={false}>
            <Typography>
              {paymentMethodAlertMap[payment.value as DonationFormPaymentMethod]}
            </Typography>
          </Alert>
          <BankPayment />
        </Box>
      ),
    },
    {
      value: 'irispay',
      label: t('step.payment-method.field.method.irispay'),
      icon: <IrisPayIcon sx={{ width: 80, height: 80 }} />,
      content: (
        <Box>
          <Alert sx={{ my: 2 }} color="info" icon={false}>
            <Typography>
              {paymentMethodAlertMap[payment.value as DonationFormPaymentMethod]}
            </Typography>
          </Alert>
        </Box>
      ),
    },
  ]
  return (
    <Grid
      container
      direction="column"
      component="section"
      id="select-payment-method"
      flexDirection={'column'}
      gap={2}>
      <Typography mb={3} variant="h5">
        {t('step.payment-method.title')}?
      </Typography>
      {error && <DonationFormSectionErrorText message={t('general.error.select-field')} />}
      {isSmall ? (
        <RadioAccordionGroup name="payment" options={mobileOptions} />
      ) : (
        <div ref={sectionRef} id="select-payment--radiocard">
          <RadioCardGroup
            loading={status === 'loading'}
            columns={4}
            name="payment"
            error={error}
            options={options}
          />
          <Collapse unmountOnExit in={payment.value === DonationFormPaymentMethod.CARD}>
            <PaymentDetailsStripeForm containerProps={{ sx: { my: 3 } }} />
            <TaxesCheckbox />
          </Collapse>
          <Collapse in={payment.value === DonationFormPaymentMethod.BANK}>
            <BankPayment />
          </Collapse>
          <Collapse unmountOnExit in={payment.value === DonationFormPaymentMethod.IRISPAY} />
        </div>
      )}
    </Grid>
  )
}
