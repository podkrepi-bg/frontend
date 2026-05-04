import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import * as yup from 'yup'
import { Form, Formik, FormikProps } from 'formik'
import { PersistFormikValues } from 'formik-persist-values'
import { Box, Button, IconButton, Tooltip, Typography, Grid2 } from '@mui/material'
import { ArrowBack, Info } from '@mui/icons-material'

import { PaymentDataElement } from 'components/client/iris-pay/IRISPaySDK'

import { routes } from 'common/routes'
import CheckboxField from 'components/common/form/CheckboxField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import ConfirmationDialog from 'components/common/ConfirmationDialog'
import SubmitButton from 'components/common/form/SubmitButton'
import { useCancelSetupIntent, useUpdateSetupIntent } from 'service/donation'

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

import { useCurrentPerson } from 'common/util/useCurrentPerson'
import { confirmStripePayment } from './helpers/confirmStripeDonation'

import { StripeError } from '@stripe/stripe-js'
import { DonationFormErrorList } from './common/DonationFormErrors'
import { useIrisElements } from '../iris-pay/irisContextHooks'
import { useIrisPayment } from './hooks/useIrisPayment'
import { usePaymentSession } from './hooks/usePaymentSession'

const initialGeneralFormValues = {
  mode: null,
  payment: null,
  authentication: null,
  isAnonymous: false,
  privacy: false,
  billingName: '',
  billingEmail: '',
  selectedBankHashId: 'bf935ea4814061d70902683c1565fa2c',
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
    is: (value: string) =>
      value === DonationFormPaymentMethod.CARD || value === DonationFormPaymentMethod.IRISPAY,
    then: yup.string().required('donation-flow:step.payment-method.field.card-data.errors.name'),
    otherwise: yup.string(),
  }),
  billingEmail: yup.string().when('payment', {
    is: (value: string) =>
      value === DonationFormPaymentMethod.CARD || value === DonationFormPaymentMethod.IRISPAY,
    then: yup
      .string()
      .email('donation-flow:step.payment-method.field.card-data.errors.email')
      .required('donation-flow:step.payment-method.field.card-data.errors.email'),
    otherwise: yup.string(),
  }),
  // selectedBankHashId: yup.string().when('payment', {
  //   is: (value: string) => value === 'irispay',
  //   then: yup.string().required('donation-flow:step.payment-method.field.bank.error'),
  //   otherwise: yup.string(),
  // }),
  authentication: yup
    .string()
    .oneOf(Object.values(DonationFormAuthState), 'donation-flow:step.authentication.error')
    .nullable()
    .required() as yup.SchemaOf<DonationFormAuthState>,
  isAnonymous: yup.boolean().required(),
  privacy: yup.bool().required().isTrue('donation-flow:step.summary.field.privacy.error'),
}

export const validationSchema = yup
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
  const { campaign, setupIntent, paymentError, setPaymentError } = useDonationFlow()
  const stripe = useStripe()
  const iris = useIrisElements()
  const elements = useElements()
  const router = useRouter()
  const updateSetupIntentMutation = useUpdateSetupIntent()
  const cancelSetupIntentMutation = useCancelSetupIntent()
  const { startSession, createSession } = usePaymentSession()
  const paymentMethodSectionRef = React.useRef<HTMLDivElement>(null)
  const authenticationSectionRef = React.useRef<HTMLDivElement>(null)
  const [showCancelDialog, setShowCancelDialog] = React.useState(false)
  const [submitPaymentLoading, setSubmitPaymentLoading] = React.useState(false)
  const [showPaymentElement, setShowPaymentElement] = React.useState(false)

  // Use the Iris payment hook
  const { handleOnPaymentElementLoad, handleOnPaymentSuccess, handleOnPaymentError, isCompleting } =
    useIrisPayment({
      formikRef,
      setShowPaymentElement,
    })
  const { data: { user: person } = { user: null } } = useCurrentPerson()
  const { data: session } = useSession({
    required: false,
    onUnauthenticated: () => {
      formikRef.current?.setFieldValue('authentication', null)
    },
  })

  useEffect(() => {
    startSession()
  }, [])

  useEffect(() => {
    if (session?.user) {
      formikRef.current?.setFieldValue('authentication', DonationFormAuthState.AUTHENTICATED, false)
      formikRef.current?.setFieldValue('isAnonymous', false)
      return
    }
    formikRef.current?.setFieldValue('billingEmail', '')
    formikRef.current?.setFieldValue('isAnonymous', true, false)
  }, [session])

  // Prefill billingName/billingEmail for authenticated users — no UI surfaces
  // these fields when IRISPAY is selected, so without this, validation blocks
  // submission. Fall back to JWT claims when the /me response hasn't arrived
  // yet or the profile is missing firstName/lastName.
  useEffect(() => {
    if (!session?.user) return
    const firstName = person?.firstName || session.user.given_name
    const lastName = person?.lastName || session.user.family_name
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || session.user.name
    if (fullName) {
      formikRef.current?.setFieldValue('billingName', fullName, false)
    }
    const email = person?.email || session.user.email
    if (email) {
      formikRef.current?.setFieldValue('billingEmail', email, false)
    }
  }, [session?.user, person?.firstName, person?.lastName, person?.email])

  // Add scroll to top when payment element shows
  useEffect(() => {
    if (showPaymentElement) {
      // Scroll to the payment element wrapper
      const paymentWrapper = document.querySelector('[data-payment-wrapper]')
      if (paymentWrapper) {
        const headerOffset = 100 // Account for fixed header
        const elementPosition = paymentWrapper.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }
  }, [showPaymentElement])

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

        if (!values.finalAmount) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: t('step.summary.alerts.error'),
          })
          return
        }

        if (values.payment === DonationFormPaymentMethod.IRISPAY) {
          try {
            cancelSetupIntentMutation.mutate({ id: setupIntent.id })
            const name = values?.billingName?.split(' ') as string[]

            const sessionData = await createSession({
              campaignId: campaign.id,
              email: values.billingEmail as string,
              name: name[0] as string,
              family: name[name.length - 1] as string,
              amount: values.finalAmount as number,
              type: person?.company ? 'corporate' : 'donation',
              isAnonymous: values.isAnonymous,
              personId: !values.isAnonymous && session?.user && person?.id ? person.id : null,
              billingName: values.billingName,
              billingEmail: values.billingEmail,
              successUrl: `${window.location.origin}${routes.campaigns.donationStatus(
                campaign.slug,
              )}?p_status=succeeded`,
              errorUrl: `${window.location.origin}${routes.campaigns.donationStatus(
                campaign.slug,
              )}?p_status=failed`,
            })

            iris?.updatePaymentSessionData?.({
              userhash: sessionData.userHash,
              hookHash: sessionData.hookHash,
            })

            iris?.updatePaymentData?.({
              sum: Number((values.finalAmount || 100) / 100),
              description: `IRISPAY ${campaign.title} - Donation`,
              currency: iris.currency,
              toIban: process.env.NEXT_PUBLIC_PLATFORM_IBAN as string,
              merchant: 'PodkrepiBG',
              useOnlySelectedBankHashes: null,
            })

            setShowPaymentElement(true)

            setSubmitPaymentLoading(false)
          } catch (error) {
            setSubmitPaymentLoading(false)
            setPaymentError({
              type: 'invalid_request_error',
              message: 'Failed to create payment session',
            })
            return
          }
          return
        }

        if (values.payment === DonationFormPaymentMethod.BANK) {
          cancelSetupIntentMutation.mutate({ id: setupIntent.id })
          helpers.resetForm()
          return router.push(
            `${routes.campaigns.donationStatus(campaign.slug)}?${new URLSearchParams({
              bank_payment: 'true',
              p_status: 'succeeded',
            }).toString()}`,
          )
        }

        if (!stripe || !elements || !setupIntent) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: t('step.summary.alerts.error'),
          })
          return
        }

        if (values.mode === 'subscription' && !session?.user?.sub) {
          setSubmitPaymentLoading(false)
          formikRef.current?.setFieldError(
            'authentication',
            t('step.summary.alerts.subscription-unauthorized'),
          )
          return
        }

        // Update the setup intent with the latest calculated amount
        try {
          const updatedIntent = await updateSetupIntentMutation.mutateAsync({
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
                personId: session?.user && person?.id ? person.id : null,
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
          )
          router.push(
            `${window.location.origin}${routes.campaigns.donationStatus(campaign.slug)}?p_status=${
              payment.status
            }&payment_intent=${payment.id}`,
          )
        } catch (error) {
          setSubmitPaymentLoading(false)
          setPaymentError({
            type: 'invalid_request_error',
            message: (error as StripeError).message ?? t('step.summary.alerts.error'),
          })
          return
        }
      }}
      validateOnMount={false}
      validateOnChange={true}
      validateOnBlur={true}>
      {({ handleSubmit, values, errors, submitCount, isValid }) => (
        <Grid2 spacing={4} container justifyContent={'center'}>
          <Grid2 size={{ sm: 12, md: 9 }} justifyContent={'center'} sx={{ position: 'relative' }}>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <ConfirmationDialog
                isOpen={showCancelDialog}
                handleCancel={() => {
                  setShowCancelDialog(false)
                }}
                title={t('cancel-dialog.title')}
                content={t('cancel-dialog.content')}
                confirmButtonLabel={t('cancel-dialog.btn-continue')}
                cancelButtonLabel={t('cancel-dialog.btn-cancel')}
                handleConfirm={() => {
                  cancelSetupIntentMutation.mutate({ id: setupIntent.id })
                  router.push(routes.campaigns.viewCampaignBySlug(campaign.slug))
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
              <Grid2 container size={{ xs: 12, md: 7 }} direction={'column'}>
                <StepSplitter content="1" active={Boolean(values.amountChosen)} />
                <Amount
                  disabled={values.payment === DonationFormPaymentMethod.BANK}
                  error={Boolean(errors.finalAmount) && Boolean(submitCount > 0)}
                />
              </Grid2>
              <Grid2 container size={{ xs: 12, md: 7 }} gap={2} direction={'column'}>
                <StepSplitter content="2" active={Boolean(values.mode)} />
                <PaymentModeSelect error={Boolean(errors.mode) && Boolean(submitCount > 0)} />
              </Grid2>
              <Grid2
                position={'relative'}
                display="flex"
                container
                justifyContent={'space-between'}
                size={{ xs: 12 }}>
                <Grid2 container size={{ xs: 12, md: 7 }} direction={'column'}>
                  <StepSplitter
                    content="3"
                    active={Boolean(values.amountChosen) && Boolean(values.payment)}
                  />
                  <PaymentMethod
                    sectionRef={paymentMethodSectionRef}
                    error={Boolean(errors.payment) && submitCount > 0}
                  />
                </Grid2>
                <Grid2 container size={{ md: 4 }} display={{ xs: 'none', md: 'flex' }}>
                  <AlertsColumn sectionsRefArray={[paymentMethodSectionRef]} />
                </Grid2>
              </Grid2>
              <Grid2
                position={'relative'}
                container
                justifyContent={'space-between'}
                flexDirection={'row'}>
                <Grid2 container size={{ xs: 12, md: 7 }} direction={'column'}>
                  <StepSplitter content="4" active={Boolean(values.authentication)} />
                  <Authentication
                    sectionRef={authenticationSectionRef}
                    error={Boolean(errors.authentication) && submitCount > 0}
                  />
                  <StepSplitter />
                </Grid2>
                <Grid2 container size={{ md: 4 }} display={{ xs: 'none', md: 'flex' }}>
                  <AlertsColumn sectionsRefArray={[authenticationSectionRef]} />
                </Grid2>
              </Grid2>
              <Grid2 container size={{ xs: 12, md: 9 }} gap={6} justifyContent={'space-between'}>
                <Grid2 container direction={'column'} gap={1} size={{ md: 6 }}>
                  <Grid2 container display={{ xs: 'flex', md: 'none' }}>
                    <PaymentSummaryAlert
                      donationAmount={Number(values.finalAmount)}
                      sx={{ maxWidth: 345 }}
                    />
                  </Grid2>
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
                  <AcceptPrivacyPolicyField
                    name="privacy"
                    showFieldError={false}
                    data-testid="donation-privacy"
                  />
                  <DonationFormErrorList
                    errors={errors}
                    show={submitCount > 0}
                    paymentError={paymentError}
                  />
                  <SubmitButton
                    data-testid="donation-submit"
                    disabled={submitPaymentLoading || (submitCount > 0 && !isValid)}
                    loading={submitPaymentLoading}
                    label={t('action.submit')}
                    sx={{ maxWidth: 150 }}
                  />
                </Grid2>
                <Grid2 container size={{ md: 4 }} display={{ xs: 'none', md: 'flex' }}>
                  <PaymentSummaryAlert
                    donationAmount={Number(values.finalAmount)}
                    sx={{ minWidth: 345, maxHeight: 175 }}
                  />
                </Grid2>
              </Grid2>
              <PersistFormikValues
                ignoreValues={['authentication', 'privacy', 'isAnonymous']}
                storage="sessionStorage"
                persistInvalid={true}
                name={`donation-flow-${campaign.slug}`}
              />
            </Form>

            {/* Payment element overlay with smooth bottom-to-top animation */}
            <Box
              data-payment-wrapper
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end', // Align to bottom
                zIndex: 1000,
                pointerEvents: showPaymentElement ? 'auto' : 'none',
                // Hide any potential lines/borders when not showing payment element
                visibility: showPaymentElement ? 'visible' : 'hidden',
              }}>
              <Box
                sx={{
                  maxHeight: showPaymentElement ? '100%' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.5s ease',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  borderRadius: 2,
                  // Remove border when payment element is not shown to prevent lines
                  border: showPaymentElement ? '1px solid #e0e0e0' : 'none',
                  backdropFilter: 'blur(4px)',
                  boxShadow: showPaymentElement ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
                  flex: 1,
                }}>
                <Box sx={{ p: 3, height: '100%', minHeight: '100%' }}>
                  <PaymentDataElement
                    onLoad={handleOnPaymentElementLoad}
                    onSuccess={handleOnPaymentSuccess}
                    onError={handleOnPaymentError}
                  />
                </Box>
              </Box>
            </Box>
          </Grid2>
        </Grid2>
      )}
    </Formik>
  )
}
