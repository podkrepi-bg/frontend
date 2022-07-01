import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { CircularProgress } from '@mui/material'
import { AxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import { useDonationSession } from 'common/hooks/donation'
import { useViewCampaign } from 'common/hooks/campaigns'
import { baseUrl, routes } from 'common/routes'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { OneTimeDonation, DonationStep as StepType } from 'gql/donations'
import NotFoundPage from 'pages/404'
import FirstStep from './steps/FirstStep'
import SecondStep from './steps/SecondStep'
import ThirdStep from './steps/ThirdStep'
import Success from './steps/Success'
import Fail from './steps/Fail'
import { FormikStep, FormikStepper } from './FormikStepper'
import { validateFirst, validateSecond, validateThird } from './helpers/validation-schema'
import { StepsContext } from './helpers/stepperContext'

const initialValues: OneTimeDonation = {
  message: '',
  anonymous: false,
  amount: '',
  otherAmount: 0,
  anonymousDonation: false,
  personFirstName: '',
  personLastName: '',
  personEmail: '',
  personPhone: '',
  payment: 'card',
  loginEmail: '',
  loginPassword: '',
  registerEmail: '',
  registerLastName: '',
  registerFirstName: '',
  registerPassword: '',
}

export default function DonationStepper() {
  const { t } = useTranslation('one-time-donation')
  const router = useRouter()
  const success = router.query.success === 'true' ? true : false
  initialValues.amount = (router.query.price as string) || ''
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data
  const mutation = useDonationSession()

  const donate = React.useCallback(
    async (amount?: number, priceId?: string) => {
      const { data } = await mutation.mutateAsync({
        mode: 'payment',
        amount,
        priceId,
        campaignId: campaign.id,
        successUrl: `${baseUrl}${routes.campaigns.oneTimeDonation(campaign.slug)}?success=true`,
        cancelUrl: `${baseUrl}${routes.campaigns.oneTimeDonation(campaign.slug)}?success=false`,
      })
      if (data.session.url) {
        window.location.href = data.session.url
      }
    },
    [mutation],
  )

  const onSubmit = async (
    values: OneTimeDonation,
    { setFieldError, resetForm }: FormikHelpers<OneTimeDonation>,
  ) => {
    try {
      const data = {
        currency: 'BGN',
        priceId: values.amount !== 'other' ? values.amount : undefined,
        amount:
          values.amount === 'other'
            ? Math.round((values.otherAmount + Number.EPSILON) * 100)
            : undefined,
      }
      await donate(data.amount, data.priceId)
      resetForm()
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }
  const steps: StepType[] = [
    {
      label: 'First Step',
      component: <FirstStep />,
      validate: validateFirst,
    },
    {
      label: 'Second Step',
      component: <SecondStep />,
      validate: validateSecond,
    },
    {
      label: 'Third Step',
      component: <ThirdStep />,
      validate: validateThird,
    },
    {
      label: 'Last Step',
      component: success ? <Success /> : <Fail />,
      validate: null,
    },
  ]
  const [step, setStep] = React.useState(0)
  return (
    <StepsContext.Provider value={{ step, setStep, campaign }}>
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <FormikStepper onSubmit={onSubmit} initialValues={initialValues}>
          {steps.map(({ label, component, validate }) => (
            <FormikStep key={label} validationSchema={validate}>
              {component}
            </FormikStep>
          ))}
        </FormikStepper>
      )}
    </StepsContext.Provider>
  )
}
