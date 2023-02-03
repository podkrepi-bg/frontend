import React from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import { PersistFormikValues } from 'formik-persist-values'
import {
  Box,
  Button,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
  Unstable_Grid2 as Grid2,
} from '@mui/material'
import { ArrowBack, Info } from '@mui/icons-material'

import { useCreateStripePayment, useUpdatePaymentIntent } from 'service/donation'
import { routes } from 'common/routes'
import CheckboxField from 'components/common/form/CheckboxField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import SubmitButton from 'components/common/form/SubmitButton'

import StepSplitter from './common/StepSplitter'
import PaymentMethod from './steps/payment-method/PaymentMethod'
import Authentication from './steps/authentication/Authentication'
import Amount, { amountValidation, initialAmountFormValues } from './steps/Amount'
import { initialLoginFormValues, loginValidation } from './steps/authentication/InlineLoginForm'
import {
  initialRegisterFormValues,
  registerFormValidation,
} from './steps/authentication/InlineRegisterForm'
import { useDonationFlow } from './DonationFlowContext'
import AlertsColumn from './alerts/AlertsColumn'
import PaymentSummaryAlert from './alerts/PaymentSummaryAlert'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
  DonationFormDataV2,
} from './helpers/types'

const initialGeneralFormValues = {
  payment: null,
  authentication: null,
  isAnonymous: false,
  email: '',
  privacy: false,
}

const generalValidation = {
  payment: yup
    .string()
    .oneOf(Object.values(DonationFormPaymentMethod))
    .required() as yup.SchemaOf<DonationFormPaymentMethod>,
  authentication: yup
    .string()
    .oneOf(Object.values(DonationFormAuthState))
    .required() as yup.SchemaOf<DonationFormAuthState>,
  isAnonymous: yup.boolean().required(),
  email: yup
    .string()
    .email('one-time-donation:errors-fields.email')
    .required()
    .when('authentication', {
      is: 'NOREGISTER',
      then: yup.string().email('one-time-donation:errors-fields.email').required(),
    }),
  privacy: yup.bool().required().isTrue('one-time-donation:errors-fields.privacy'),
}

const initialValues: DonationFormDataV2 = {
  ...initialGeneralFormValues,
  ...initialAmountFormValues,
  ...initialLoginFormValues,
  ...initialRegisterFormValues,
}

export const validationSchema: yup.SchemaOf<DonationFormDataV2> = yup
  .object()
  .defined()
  .shape({
    ...generalValidation,
    ...amountValidation,
    ...loginValidation,
    ...registerFormValidation,
  })

export function DonationFlowForm() {
  const { data: session } = useSession()
  const { campaign, stripePaymentIntent, setPaymentError } = useDonationFlow()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const createStripePaymentMutation = useCreateStripePayment()
  const updatePaymentIntentMutation = useUpdatePaymentIntent()
  const paymentMethodSectionRef = React.useRef<HTMLDivElement>(null)
  const authenticationSectionRef = React.useRef<HTMLDivElement>(null)
  const [showCancelDialog, setShowCancelDialog] = React.useState(false)
  const [submitPaymentLoading, setSubmitPaymentLoading] = React.useState(false)
  return (
    <Formik
      initialValues={{
        ...initialValues,
        email: session?.user?.email ?? '',
        authentication: session?.user ? DonationFormAuthState.AUTHENTICATED : null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        if (values.payment === DonationFormPaymentMethod.BANK) {
          // TODO: Handle form after bank transfer
        }
        setSubmitPaymentLoading(true)
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Form should be disabled but TS doesn't know that.
          setSubmitPaymentLoading(false)
          throw new Error('Stripe.js has not loaded when trying to submit the form')
        }

        if (!stripePaymentIntent) {
          setSubmitPaymentLoading(false)
          throw new Error('Stripe payment intent does not exist when trying to submit the form')
        }

        try {
          await updatePaymentIntentMutation.mutateAsync({
            id: stripePaymentIntent.id,
            payload: {
              amount: Math.round(Number(values.finalAmount)),
              currency: campaign.currency,
            },
          })
        } catch (error) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: "We couldn't update the payment intent. Please try again later.",
          })
        }

        try {
          await createStripePaymentMutation.mutateAsync({
            isAnonymous: values.isAnonymous,
            personEmail: session?.user?.email || values.email,
            paymentIntentId: stripePaymentIntent.id,
            firstName: session?.user?.given_name || null,
            lastName: session?.user?.family_name || null,
            phone: null,
          })
        } catch (error) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: "We couldn't create the payment. Please try again later.",
          })
        }

        const { error } = await stripe.confirmPayment({
          //`Elements` instance that was used to create the Payment Element
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/campaigns/donation-v2/${campaign.slug}`,
          },
        })
        setSubmitPaymentLoading(false)
        if (error) {
          setPaymentError(error)
        }
      }}
      validateOnMount
      validateOnBlur>
      {({ handleSubmit, values, isValid }) => (
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
              <ConfirmationDialog
                isOpen={showCancelDialog}
                handleCancel={() => router.push(routes.campaigns.viewCampaignBySlug(campaign.slug))}
                title="Наистина ли искате да откажете дарението?"
                content="Така ще изгубите всички въведени данни."
                confirmButtonLabel="Продължи дарението"
                cancelButtonLabel="Откажи дарението"
                handleConfirm={() => setShowCancelDialog(false)}
              />
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  setShowCancelDialog(true)
                }}>
                <ArrowBack sx={{ mr: 2 }} /> Назад
              </Button>
              <Box mb={2}>
                <StepSplitter content="1" active={Boolean(values.amountChosen)} />
                <Amount disabled={values.payment === DonationFormPaymentMethod.BANK} />
                <StepSplitter
                  content="2"
                  active={Boolean(values.amountChosen) && Boolean(values.payment)}
                />
                <PaymentMethod sectionRef={paymentMethodSectionRef} />
                <StepSplitter
                  content="3"
                  active={
                    Boolean(values.amountChosen) &&
                    Boolean(values.payment) &&
                    Boolean(values.authentication)
                  }
                />
                <Authentication sectionRef={authenticationSectionRef} />
              </Box>
              <StepSplitter />
              <CheckboxField
                label={
                  <Box display="flex" alignItems="center">
                    <Typography>Искам да съм анонимен</Typography>
                    <Tooltip title="Ако дарете анонимно, данните ще останат недостъпни за бенефициента.">
                      <IconButton color="primary">
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                name="isAnonymous"
              />
              {/* TODO: Handle the possible API and Stripe Errors */}
              {/* {JSON.stringify(paymentError)} */}
              <AcceptPrivacyPolicyField name="privacy" />
              <Hidden mdUp>
                <PaymentSummaryAlert
                  donationAmount={Number(values.finalAmount)}
                  sx={{
                    flex: 1,
                    my: 2,
                  }}
                />
              </Hidden>

              <SubmitButton
                loading={submitPaymentLoading}
                disabled={!isValid || !stripe || !elements}
                label="Donate"
                fullWidth
              />
              <PersistFormikValues debounce={3000} storage="sessionStorage" name="donation-form" />
            </Form>
          </Grid2>
          <Hidden mdDown>
            <Grid2 display={'flex'} alignItems="flex-end" sx={{ overflow: 'auto' }} md={4}>
              <AlertsColumn
                sectionsRefArray={[paymentMethodSectionRef, authenticationSectionRef]}
              />
              <PaymentSummaryAlert
                donationAmount={Number(values.finalAmount)}
                sx={{
                  flex: 1,
                }}
              />
            </Grid2>
          </Hidden>
        </Grid2>
      )}
    </Formik>
  )
}
