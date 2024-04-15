import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import * as yup from 'yup'
import { Form, Formik, FormikProps } from 'formik'
import { PersistFormikValues } from 'formik-persist-values'
import {
  Alert,
  Box,
  Button,
  Hidden,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  Unstable_Grid2 as Grid2,
} from '@mui/material'
import { ArrowBack, Info } from '@mui/icons-material'

import theme from 'common/theme'
import { routes } from 'common/routes'
import CheckboxField from 'components/common/form/CheckboxField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import SubmitButton from 'components/common/form/SubmitButton'
import { useUpdateSetupIntent } from 'service/donation'

import StepSplitter from './common/StepSplitter'
import PaymentMethod from './steps/payment-method/PaymentMethod'
import Authentication from './steps/authentication/Authentication'
import Amount, { amountValidation, initialAmountFormValues } from './steps/Amount'
import { initialLoginFormValues, loginValidation } from './steps/authentication/InlineLoginForm'
import {
  initialRegisterFormValues,
  registerFormValidation,
} from './steps/authentication/InlineRegisterForm'
import { useDonationFlow } from './contexts/DonationFlowProvider'
import AlertsColumn from './alerts/AlertsColumn'
import PaymentSummaryAlert from './alerts/PaymentSummaryAlert'
import {
  DonationFormAuthState,
  DonationFormPaymentMethod,
  DonationFormData,
  PaymentMode,
  DonationFormPaymentStatus,
} from './helpers/types'
import { DonationType } from 'gql/donations.enums'
import PaymentModeSelect from './steps/PaymentModeSelect'

import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { confirmStripePayment } from './helpers/confirmStripeDonation'

import { StripeError } from '@stripe/stripe-js'
import { DonationFormErrorList } from './common/DonationFormErrors'

const initialGeneralFormValues = {
  mode: null,
  payment: null,
  authentication: null,
  isAnonymous: false,
  privacy: false,
  billingName: '',
  billingEmail: '',
}

const initialValues: DonationFormData = {
  ...initialGeneralFormValues,
  ...initialAmountFormValues,
  ...initialLoginFormValues,
  ...initialRegisterFormValues,
}

const generalValidation = {
  mode: yup
    .string()
    .oneOf(['one-time', 'subscription'], 'donation-flow:step.payment-mode.error')
    .nullable()
    .required() as yup.SchemaOf<PaymentMode>,
  payment: yup
    .string()
    .oneOf(Object.values(DonationFormPaymentMethod), 'donation-flow:step.payment-method.error')
    .nullable()
    .required() as yup.SchemaOf<DonationFormPaymentMethod>,
  billingName: yup.string().when('payment', {
    is: 'card',
    then: yup.string().required('donation-flow:step.payment-method.field.card-data.errors.name'),
  }),
  billingEmail: yup.string().when('payment', {
    is: 'card',
    then: yup.string().required('donation-flow:step.payment-method.field.card-data.errors.email'),
  }),
  authentication: yup
    .string()
    .oneOf(Object.values(DonationFormAuthState), 'donation-flow:step.authentication.error')
    .nullable()
    .required() as yup.SchemaOf<DonationFormAuthState>,
  isAnonymous: yup.boolean().required(),
  privacy: yup.bool().required().isTrue('donation-flow:step.summary.field.privacy.error'),
}

export const validationSchema: yup.SchemaOf<DonationFormData> = yup
  .object()
  .defined()
  .shape({
    ...generalValidation,
    ...amountValidation,
    ...loginValidation,
    ...registerFormValidation,
  })

export function DonationFlowForm() {
  const formikRef = useRef<FormikProps<DonationFormData> | null>(null)
  const { t } = useTranslation('donation-flow')
  const { data: session } = useSession({
    required: false,
    onUnauthenticated: () => {
      formikRef.current?.setFieldValue('authentication', null)
    },
  })
  useEffect(() => {
    if (session?.user) {
      formikRef.current?.setFieldValue('email', session.user.email, false)
      formikRef.current?.setFieldValue('authentication', DonationFormAuthState.AUTHENTICATED, false)
      formikRef.current?.setFieldValue('isAnonymous', false)
      return
    }
    formikRef.current?.setFieldValue('email', '')
    formikRef.current?.setFieldValue('isAnonymous', true, false)
  }, [session])
  const { campaign, setupIntent, paymentError, setPaymentError, idempotencyKey } = useDonationFlow()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const updateSetupIntentMutation = useUpdateSetupIntent()
  const paymentMethodSectionRef = React.useRef<HTMLDivElement>(null)
  const authenticationSectionRef = React.useRef<HTMLDivElement>(null)
  const [showCancelDialog, setShowCancelDialog] = React.useState(false)
  const [submitPaymentLoading, setSubmitPaymentLoading] = React.useState(false)
  const { data: { user: person } = { user: null } } = useCurrentPerson()

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        ...initialValues,
        authentication: session?.user ? DonationFormAuthState.AUTHENTICATED : null,
        isAnonymous: session?.user ? false : true,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, helpers) => {
        setSubmitPaymentLoading(true)
        if (values.payment === DonationFormPaymentMethod.BANK) {
          helpers.resetForm()
          sessionStorage.removeItem('donation-form')
          return router.push(
            `${routes.campaigns.donationStatus(campaign.slug)}?${new URLSearchParams({
              bank_payment: 'true',
            }).toString()}`,
          )
        }

        if (!stripe || !elements || !setupIntent) {
          // Stripe.js has not yet loaded.
          // Form should be disabled but TS doesn't know that.
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: t('step.summary.alerts.error'),
          })
          return
        }

        if (!values.finalAmount) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: t('step.summary.alerts.error'),
          })
          return
        }

        // Update the setup intent with the latest calculated amount
        try {
          const updatedIntent = await updateSetupIntentMutation.mutateAsync({
            id: setupIntent.id,
            idempotencyKey,
            payload: {
              metadata: {
                type: person?.company ? DonationType.corporate : DonationType.donation,
                campaignId: campaign.id,
                amount: values.finalAmount,
                currency: campaign.currency,
                isAnonymous: values.isAnonymous.toString(),
                return_url: `${window.location.origin}/${routes.campaigns.donationStatus(
                  campaign.slug,
                )}`,
              },
            },
          })
          // Confirm the payment
          const payment = await confirmStripePayment(
            updatedIntent.data,
            elements,
            stripe,
            campaign,
            values,
            session,
            idempotencyKey,
          )
          if (payment.status === DonationFormPaymentStatus.SUCCEEDED) {
            sessionStorage.removeItem('donation-form')
            router.push(
              `${window.location.origin}${routes.campaigns.donationStatus(
                campaign.slug,
              )}?p_status=${DonationFormPaymentStatus.SUCCEEDED}`,
            )
          }
        } catch (error) {
          helpers.resetForm()
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: (error as StripeError).message ?? t('step.summary.alerts.error'),
          })

          return
        }

        // Confirm the payment
      }}
      validateOnMount={false}
      validateOnChange={true}
      validateOnBlur={true}>
      {({ handleSubmit, values, errors, submitCount }) => (
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
                handleCancel={() => {
                  // TODO: Cancel the setup intent
                  router.push(routes.campaigns.viewCampaignBySlug(campaign.slug))
                }}
                title={t('cancel-dialog.title')}
                content={t('cancel-dialog.content')}
                confirmButtonLabel={t('cancel-dialog.btn-continue')}
                cancelButtonLabel={t('cancel-dialog.btn-cancel')}
                handleConfirm={() => {
                  setShowCancelDialog(false)
                }}
              />
              <Button
                size="large"
                variant="outlined"
                onClick={() => {
                  setShowCancelDialog(true)
                }}>
                <ArrowBack sx={{ mr: 2 }} /> {t('action.back')}
              </Button>
              <Box mb={2}>
                <StepSplitter content="1" active={Boolean(values.amountChosen)} />
                <Amount
                  disabled={values.payment === DonationFormPaymentMethod.BANK}
                  error={Boolean(errors.finalAmount) && Boolean(submitCount > 0)}
                />
                <StepSplitter content="2" active={Boolean(values.mode)} />
                <PaymentModeSelect error={Boolean(errors.mode) && Boolean(submitCount > 0)} />
                <StepSplitter
                  content="3"
                  active={Boolean(values.amountChosen) && Boolean(values.payment)}
                />
                <PaymentMethod
                  sectionRef={paymentMethodSectionRef}
                  error={Boolean(errors.payment) && submitCount > 0}
                />
                <StepSplitter
                  content="4"
                  active={
                    Boolean(values.amountChosen) &&
                    Boolean(values.payment) &&
                    Boolean(values.authentication)
                  }
                />
                <Authentication
                  sectionRef={authenticationSectionRef}
                  error={Boolean(errors.authentication) && submitCount > 0}
                />
              </Box>
              <StepSplitter />
              <CheckboxField
                label={
                  <Box display="flex" alignItems="center">
                    <Typography>{t('step.summary.field.anonymous.label')}</Typography>
                    <Tooltip title={t('step.summary.field.anonymous.description')}>
                      <IconButton color="primary">
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </Box>
                }
                name="isAnonymous"
                checkboxProps={{
                  disabled: !session?.user,
                }}
              />
              <AcceptPrivacyPolicyField name="privacy" showFieldError={false} />
              <Hidden mdUp>
                <PaymentSummaryAlert
                  donationAmount={Number(values.finalAmount)}
                  sx={{
                    flex: 1,
                    my: 2,
                  }}
                />
              </Hidden>
              <DonationFormErrorList errors={errors} show={submitCount > 0} />
              <Stack direction={'column'}>
                {paymentError ? (
                  <Alert sx={{ fontSize: theme.typography.fontSize, mb: 1 }} severity="error">
                    {paymentError.message}
                  </Alert>
                ) : null}
              </Stack>
              <SubmitButton
                disabled={submitPaymentLoading}
                loading={submitPaymentLoading}
                label={t('action.submit')}
                fullWidth
              />
              <PersistFormikValues
                hashInitials={true}
                ignoreValues={['authentication']}
                debounce={3000}
                storage="sessionStorage"
                name="donation-form"
              />
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
