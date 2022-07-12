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
import { useSession } from 'next-auth/react'
import { toMoney } from 'common/util/money'

const initialValues: OneTimeDonation = {
  message: '',
  anonymous: false,
  amount: '',
  otherAmount: 0,
  anonymousDonation: false,
  personsFirstName: '',
  personsLastName: '',
  personsEmail: '',
  personsPhone: '',
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
  const { data: session } = useSession()
  const userEmail = session?.user?.email
  const donate = React.useCallback(
    async (amount?: number, priceId?: string, values?: OneTimeDonation) => {
      const { data } = await mutation.mutateAsync({
        mode: 'payment',
        amount,
        priceId,
        campaignId: campaign.id,
        firstName: values?.personsFirstName ? values.personsFirstName : 'Anonymous',
        lastName: values?.personsLastName ? values.personsLastName : 'Donor',
        personEmail: values?.personsEmail ? values.personsEmail : userEmail!,
        phone: values?.personsPhone ? values.personsPhone : null,
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
        currency: campaign.currency,
        priceId: values.amount !== 'other' ? values.amount : undefined,
        amount: values.amount === 'other' ? toMoney(values.otherAmount) : undefined,
      }
      await donate(data.amount, data.priceId, values)
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
