import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
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
import { useCreateSubscriptionPayment, useUpdateSetupIntent } from 'service/donation'

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
} from './helpers/types'
import { DonationType } from 'gql/donations.enums'
import PaymentModeSelect from './steps/PaymentModeSelect'
import { Currency } from 'gql/currency'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

const initialGeneralFormValues = {
  mode: null,
  payment: null,
  authentication: null,
  isAnonymous: false,
  privacy: false,
}

const initialValues: DonationFormData = {
  ...initialGeneralFormValues,
  ...initialAmountFormValues,
  ...initialLoginFormValues,
  ...initialRegisterFormValues,
}

const generalValidation = {
  mode: yup.string().oneOf(['one-time', 'subscription']).required() as yup.SchemaOf<PaymentMode>,
  payment: yup
    .string()
    .oneOf(Object.values(DonationFormPaymentMethod))
    .required() as yup.SchemaOf<DonationFormPaymentMethod>,
  authentication: yup
    .string()
    .oneOf(Object.values(DonationFormAuthState))
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
      formikRef.current?.setFieldValue('email', session.user.email)
      formikRef.current?.setFieldValue('authentication', DonationFormAuthState.AUTHENTICATED)
      formikRef.current?.setFieldValue('isAnonymous', false)
      return
    }
    formikRef.current?.setFieldValue('email', '')
    formikRef.current?.setFieldValue('isAnonymous', true)
  }, [session])
  const { campaign, setupIntent, paymentError, setPaymentError } = useDonationFlow()
  const stripe = useStripe()
  const elements = useElements()
  const router = useRouter()
  const createSubscriptionPaymentMutation = useCreateSubscriptionPayment()
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
      onSubmit={async (values) => {
        setSubmitPaymentLoading(true)
        if (values.payment === DonationFormPaymentMethod.BANK) {
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
          elements.submit()
          if (values.mode === 'subscription') {
            const paymentIntent = await createSubscriptionPaymentMutation.mutateAsync({
              type: person?.company ? DonationType.corporate : DonationType.donation,
              amount: values.finalAmount,
              campaignId: campaign.id,
              currency: campaign.currency as Currency,
            })
            const redirectUrl = `${window.location.origin}/${routes.campaigns.donationStatus(
              campaign.slug,
            )}?subscription=true`

            const { error } = await stripe.confirmPayment({
              elements,
              confirmParams: {
                return_url: redirectUrl,
              },
              clientSecret: paymentIntent.data.client_secret as string,
            })
            return
          }
          await updateSetupIntentMutation.mutateAsync({
            id: setupIntent.id,
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
        } catch (error) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: t('step.summary.alerts.error'),
          })
          return
        }

        // Confirm the payment
        const redirectUrl = new URL(
          `${window.location.origin}/${routes.campaigns.finalizeDonation}`,
        )
        redirectUrl.search = new URLSearchParams({
          campaignSlug: campaign.slug,
        }).toString()
        const { error } = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: redirectUrl.toString(),
          },
        })
        setSubmitPaymentLoading(false)
        if (error) {
          setPaymentError(error)
          return
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
                <Amount disabled={values.payment === DonationFormPaymentMethod.BANK} />
                <StepSplitter content="2" active={Boolean(values.mode)} />
                <PaymentModeSelect />
                <StepSplitter
                  content="3"
                  active={Boolean(values.amountChosen) && Boolean(values.payment)}
                />
                <PaymentMethod sectionRef={paymentMethodSectionRef} />
                <StepSplitter
                  content="4"
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

              <Stack direction={'column'}>
                {paymentError ? (
                  <Alert sx={{ fontSize: theme.typography.fontSize, mb: 1 }} severity="error">
                    {paymentError.message}
                  </Alert>
                ) : null}
              </Stack>
              <SubmitButton
                disabled={submitPaymentLoading || !isValid}
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
