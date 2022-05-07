import * as React from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Success from './Success'
import Fail from './Fail'
import { FormikStep, FormikStepper } from './FormikStepper'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useViewCampaign } from 'common/hooks/campaigns'
import { AxiosError } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { FormikHelpers } from 'formik'
import { validateFirst, validateSecond, validateThird } from '../helpers/validation-schema'
import { OneTimeDonation, DonationStep as StepType } from 'gql/donations'
import { useDonationSession } from 'common/hooks/donation'
import NotFoundPage from 'pages/404'
import { baseUrl, routes } from 'common/routes'
import { StepsContext } from './StepperContext'
import { CircularProgress } from '@mui/material'

const initialValues: OneTimeDonation = {
  message: '',
  anonymous: false,
  amount: '',
  anonymousDonation: false,
  personFirstName: '',
  personLastName: '',
  personEmail: '',
  personPhone: '',
  payment: 'card',
}

export default function DonationStepper() {
  const { t } = useTranslation('one-time-donation')
  const router = useRouter()
  const success = router.query.success === 'true' ? true : false
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  if (!data || !data.campaign) return <NotFoundPage />
  const { campaign } = data
  const mutation = useDonationSession()

  const donate = React.useCallback(
    async (priceId: string) => {
      const { data } = await mutation.mutateAsync({
        mode: 'payment',
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
        amount: values.amount,
      }
      await donate(data.amount)
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
