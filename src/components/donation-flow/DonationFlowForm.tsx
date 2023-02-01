import React, { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { PersistFormikValues } from 'formik-persist-values'
import { Alert, Box, Hidden, Unstable_Grid2 as Grid2 } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { useCreateStripePayment } from 'service/donation'
import { CardRegion } from 'gql/donations.enums'
import SubmitButton from 'components/common/form/SubmitButton'

import StepSplitter from './common/StepSplitter'
import Amount from './steps/Amount'
import PaymentMethod from './steps/payment-method/PaymentMethod'
import Authentication from './steps/authentication/Authentication'
import { DonationFlowContext } from './DonationFlowContext'

export enum DonationFormDataAuthState {
  LOGIN = 'login',
  REGISTER = 'register',
  AUTHENTICATED = 'authenticated',
  NOREGISTER = 'noregister',
}

export enum DonationFormDataPaymentOption {
  CARD = 'card',
  BANK = 'bank',
}
export type DonationFormDataV2 = {
  isAnonymous: boolean
  authentication: DonationFormDataAuthState | null
  payment: DonationFormDataPaymentOption | null
  email: string
  cardRegion: CardRegion
  cardIncludeFees: boolean
  amount?: string
  amountWithFees?: number
  otherAmount?: number
}

const initialValues: DonationFormDataV2 = {
  amount: '',
  email: '',
  payment: null,
  amountWithFees: 0,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
  otherAmount: 0,
  authentication: null,
  isAnonymous: false,
}

export const validationSchema: yup.SchemaOf<DonationFormDataV2> = yup
  .object()
  .defined()
  .shape({
    payment: yup
      .string()
      .oneOf(Object.values(DonationFormDataPaymentOption))
      .required() as yup.SchemaOf<DonationFormDataPaymentOption>,
    amount: yup.string().when('payment', {
      is: 'card',
      then: yup.string().required(),
    }),
    amountWithFees: yup.number().when('payment', {
      is: 'card',
      then: () =>
        yup.number().min(1, 'one-time-donation:errors-fields.amount-with-fees').required(),
    }),
    otherAmount: yup.number().when('amount', {
      is: 'other',
      then: yup.number().min(1, 'one-time-donation:errors-fields.other-amount').required(),
    }),
    cardIncludeFees: yup.boolean().required(),
    cardRegion: yup
      .string()
      .oneOf(Object.values(CardRegion))
      .when('payment', {
        is: 'card',
        then: yup.string().oneOf(Object.values(CardRegion)).required(),
      }) as yup.SchemaOf<CardRegion>,
    authentication: yup
      .string()
      .oneOf(Object.values(DonationFormDataAuthState))
      .required() as yup.SchemaOf<DonationFormDataAuthState>,
    isAnonymous: yup.boolean().required(),
    email: yup
      .string()
      .required()
      .when('authentication', {
        is: 'NOREGISTER',
        then: yup.string().email('one-time-donation:errors-fields.email').required(),
      }),
  })

export function DonationFlowForm() {
  const { data: session } = useSession()
  const { campaign, stripePaymentIntent } = useContext(DonationFlowContext)
  const stripe = useStripe()
  const elements = useElements()
  const createStripePaymentMutation = useCreateStripePayment()
  return (
    <Formik
      initialValues={{
        ...initialValues,
        email: session?.user?.email ?? '',
        authentication: session?.user ? DonationFormDataAuthState.AUTHENTICATED : null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (!stripe || !elements || !stripePaymentIntent) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          throw new Error('Stripe.js has not yet loaded')
        }
        await createStripePaymentMutation.mutateAsync({
          isAnonymous: values.isAnonymous,
          personEmail: session?.user?.email || values.email,
          paymentIntentId: stripePaymentIntent?.id,
          firstName: session?.user?.given_name || null,
          lastName: session?.user?.family_name || null,
          phone: null,
        })
        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/campaigns/donation-v2/${campaign.slug}`,
          },
        })

        if (error) {
          AlertStore.show(
            error?.message || 'Unkown error. Please contact is through the support form',
            'error',
          )
        }
      }}
      validateOnMount
      validateOnBlur>
      {({ handleSubmit, values }) => (
        <Grid2 spacing={4} container>
          <Grid2 sm={12} md={8}>
            <Form
              onSubmit={handleSubmit}
              style={{
                maxWidth: '662px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              autoComplete="off">
              <Box mb={2}>
                <StepSplitter content="1" active={Boolean(values.amount)} />
                <Amount />
                <StepSplitter
                  content="2"
                  active={Boolean(values.amount) && Boolean(values.payment)}
                />
                <PaymentMethod />
                <StepSplitter
                  content="3"
                  active={
                    Boolean(values.amount) &&
                    Boolean(values.payment) &&
                    Boolean(values.authentication)
                  }
                />
                <Authentication />
              </Box>
              <SubmitButton label="Donate" fullWidth />
              <PersistFormikValues debounce={3000} storage="sessionStorage" name="donation-form" />
            </Form>
          </Grid2>
          <Hidden mdDown>
            <Grid2 sx={{ overflow: 'auto' }} md={4}>
              <Alert sx={{ position: 'sticky', top: 0 }} color="error">
                TODO: Alerts row here
              </Alert>
            </Grid2>
          </Hidden>
        </Grid2>
      )}
    </Formik>
  )
}
