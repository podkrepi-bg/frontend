import * as React from 'react'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import Success from './Success'
import Fail from './Fail'
import { FormikStep, FormikStepper } from './FormikStepper'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useMutation, UseQueryResult } from 'react-query'
import { CampaignResponse } from 'gql/campaigns'
import { useViewCampaign } from 'common/hooks/campaigns'
import { useCreateBankDonation } from 'service/donation'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { FormikHelpers } from 'formik'
import { validateFirst, validateSecond, validateThird } from '../helpers/validation-schema'
import {
  DonationBankInput,
  DonationResponse,
  OneTimeDonation,
  DonationStep as StepType,
} from 'gql/donations'

const initialValues: OneTimeDonation = {
  message: '',
  anonymous: false,
  amount: 0,
  anonymousDonation: false,
  personFirstName: '',
  personLastName: '',
  personEmail: '',
  personPhone: '',
  payment: 'card',
}

export default function DonationStepper() {
  const [success, setSuccess] = React.useState(false)
  const { t } = useTranslation('one-time-donation')
  const router = useRouter()
  const slug = String(router.query.slug)
  const { data }: UseQueryResult<{ campaign: CampaignResponse }> = useViewCampaign(slug as string)
  const mutationFn = useCreateBankDonation()

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    DonationBankInput
  >({
    mutationFn,
    onSuccess: () => {
      setSuccess(true)
    },
  })
  const onSubmit = async (
    values: OneTimeDonation,
    { setFieldError, resetForm }: FormikHelpers<OneTimeDonation>,
  ) => {
    try {
      const data = {
        currency: 'BGN',
        amount: Number(values.amount),
        personsEmail: values.personEmail,
        personsFirstName: values.personFirstName,
        personsLastName: values.personLastName,
        personsPhone: values.personPhone,
        extCustomerId: String(Math.random() * 5),
        extPaymentIntentId: String(Math.random() * 5),
        extPaymentMethodId: String(Math.random() * 5),
      }
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
  return (
    <FormikStepper onSubmit={onSubmit} initialValues={initialValues}>
      {steps.map(({ label, component, validate }) => (
        <FormikStep key={label} validationSchema={validate}>
          {component}
        </FormikStep>
      ))}
    </FormikStepper>
  )
}
