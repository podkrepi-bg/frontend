import * as React from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { CircularProgress } from '@mui/material'
import { AxiosError } from 'axios'
import { FormikHelpers } from 'formik'

import { CardRegion, PaymentProvider } from 'gql/donations.enums'
import { OneTimeDonation, DonationStep as StepType } from 'gql/donations'
import { createDonationWish } from 'service/donationWish'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import CenteredSpinner from 'components/common/CenteredSpinner'
import { useDonationSession } from 'common/hooks/donation'
import { useViewCampaign } from 'common/hooks/campaigns'
import { baseUrl, routes } from 'common/routes'

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
  isAnonymous: false,
  amount: '',
  amountWithFees: 0,
  cardIncludeFees: false,
  cardRegion: CardRegion.EU,
  otherAmount: 0,
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
  isRecurring: false,
}
interface DonationStepperProps {
  onStepChange: () => void
}

export default function DonationStepper({ onStepChange }: DonationStepperProps) {
  const { t, i18n } = useTranslation('one-time-donation')
  const router = useRouter()
  const success = router.query.success === 'true' ? true : false
  initialValues.amount = (router.query.price as string) || ''
  const slug = String(router.query.slug)
  const { data, isLoading } = useViewCampaign(slug)
  const mutation = useDonationSession()
  const { data: session } = useSession()
  const { data: { user: person } = { user: null } } = useCurrentPerson()
  if (isLoading || !data) return <CenteredSpinner size="2rem" />
  const { campaign } = data

  function isLogged() {
    return session && session.accessToken ? true : false
  }

  initialValues.isRecurring = false

  const userEmail = session?.user?.email
  const donate = React.useCallback(
    async (amount?: number, values?: OneTimeDonation) => {
      const { data } = await mutation.mutateAsync({
        mode: values?.isRecurring ? 'subscription' : 'payment',
        amount,
        campaignId: campaign.id,
        personId: person ? person?.id : '',
        firstName: values?.personsFirstName ? values.personsFirstName : 'Anonymous',
        lastName: values?.personsLastName ? values.personsLastName : 'Donor',
        personEmail: values?.personsEmail ? values.personsEmail : userEmail,
        isAnonymous: values?.isAnonymous !== undefined ? values.isAnonymous : true,
        phone: values?.personsPhone ? values.personsPhone : null,
        successUrl: `${baseUrl}/${i18n.language}/${routes.campaigns.oneTimeDonation(
          campaign.slug,
        )}?success=true`,
        cancelUrl: `${baseUrl}/${i18n.language}/${routes.campaigns.oneTimeDonation(
          campaign.slug,
        )}?success=false`,
        message: values?.message,
      })
      if (values?.payment === PaymentProvider.bank) {
        // Do not redirect for bank payments
        return
      }
      if (data.session.url) {
        //send the user to payment provider
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
      if (values?.payment === PaymentProvider.bank) {
        if (values?.message) {
          await createDonationWish({
            message: values.message,
            campaignId: campaign.id,
            personId: !values.isAnonymous && person?.id ? person.id : null,
          })
        }
        router.push(`${baseUrl}${routes.campaigns.oneTimeDonation(campaign.slug)}?success=true`)
        return
      }

      const data = {
        currency: campaign.currency,
        amount: Math.round(values.amountWithFees),
      }
      await donate(data.amount, values)
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
      label: 'amount',
      component: <FirstStep />,
      validate: validateFirst,
    },
    {
      label: 'personal-profile',
      component: <SecondStep />,
      validate: validateSecond,
    },
    {
      label: 'wish',
      component: <ThirdStep />,
      validate: validateThird,
    },
    {
      label: 'payment',
      component: success ? <Success campaignSlug={slug} /> : <Fail campaignSlug={slug} />,
      validate: null,
    },
  ]
  const [step, setStep] = React.useState(0)

  React.useEffect(() => {
    onStepChange()
  }, [step])

  return (
    <StepsContext.Provider value={{ step, setStep, campaign }}>
      {isLoading ? (
        <CircularProgress color="primary" />
      ) : (
        <FormikStepper onSubmit={onSubmit} initialValues={initialValues}>
          {steps.map(({ label, component, validate }) => (
            <FormikStep key={label} label={t(`step-labels.${label}`)} validationSchema={validate}>
              {component}
            </FormikStep>
          ))}
        </FormikStepper>
      )}
    </StepsContext.Provider>
  )
}
