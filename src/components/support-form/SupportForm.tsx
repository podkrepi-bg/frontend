import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import React, { useState, useRef } from 'react'
import { FormikHelpers, FormikProps } from 'formik'
import { Stepper, Step, StepLabel, StepConnector, Hidden, Grid, Box } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { createSupportRequest } from 'service/support'
import GenericForm from 'components/common/form/GenericForm'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'

import Actions from './Actions'
import Roles from './steps/Roles'
import StepIcon from './StepperIcon'
import ThankYou from './steps/ThankYou'
import GeneralInfo from './steps/GeneralInfo'
import AdditionalQuestions from './steps/AdditionalQuestions'
import { validationSchema } from './helpers/validation-schema'
import {
  Steps,
  Step as StepType,
  SupportFormData,
  SupportRequestResponse,
  SupportRequestInput,
} from './helpers/support-form.types'

const initialValues: SupportFormData = {
  person: {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    comment: '',
    terms: false,
    gdpr: false,
    newsletter: false,
  },
  roles: {
    benefactor: false,
    partner: false,
    associationMember: false,
    company: false,
    volunteer: false,
  },
  benefactor: {
    campaignBenefactor: false,
    platformBenefactor: false,
  },
  partner: {
    npo: false,
    bussiness: false,
    other: false,
    otherText: '',
  },
  volunteer: {
    backend: false,
    frontend: false,
    marketing: false,
    designer: false,
    projectManager: false,
    devOps: false,
    security: false,
    financesAndAccounts: false,
    lawyer: false,
    qa: false,
  },
  associationMember: {
    isMember: true,
  },
  company: {
    sponsor: false,
    volunteer: false,
    other: false,
    otherText: '',
  },
}

const steps: StepType[] = [
  {
    label: 'support:steps.role.title',
    component: <Roles />,
  },
  {
    label: 'support:steps.addition-questions.title',
    component: <AdditionalQuestions />,
  },
  {
    label: 'support:steps.info.title',
    component: <GeneralInfo />,
  },
  {
    label: 'support:steps.thank-you.title',
    component: <ThankYou />,
  },
]

export type NewsletterDialogProps = {
  isOpen: boolean
  handleConfirm: () => void
  handleCancel: () => void
}

export default function SupportForm() {
  const { t } = useTranslation()

  const formRef = useRef<FormikProps<SupportFormData>>(null)
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ROLES)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  const mutation = useMutation<
    AxiosResponse<SupportRequestResponse>,
    AxiosError<ApiErrors>,
    SupportRequestInput
  >({
    mutationFn: createSupportRequest,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (values: SupportFormData, actions: FormikHelpers<SupportFormData>) => {
    if (isLastStep(activeStep, steps)) {
      const errors = await actions.validateForm()
      const hasErrors = !!Object.keys(errors).length
      if (hasErrors) {
        setFailedStep(Steps.PERSON)
        return
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setFailedStep(Steps.NONE)
      try {
        const { person, ...supportData } = values
        await mutation.mutateAsync({ person, supportData })
        actions.resetForm()
        if (window) {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      } catch (error) {
        console.error(error)
        if (isAxiosError(error)) {
          const { response } = error as AxiosError<ApiErrors>
          response?.data.message.map(({ property, constraints }) => {
            actions.setFieldError(property, t(matchValidator(constraints)))
          })
        }
      }

      return
    }

    actions.setTouched({})
    actions.setSubmitting(false)
    switch (activeStep) {
      case Steps.ROLES:
        {
          const errors = await actions.validateForm()
          if (errors.roles) {
            setFailedStep(Steps.ROLES)
            return
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setFailedStep(Steps.NONE)
        }
        break
      case Steps.QUESTIONS:
        {
          const errors = await actions.validateForm()
          let hasErrors = false
          const questions = Object.entries(values.roles)
            .filter(([, value]) => value)
            .map(([key]) => key)

          Object.keys(errors).forEach((error) => {
            if (questions.includes(error)) {
              hasErrors = true
            }
          })

          if (hasErrors) {
            setFailedStep(Steps.QUESTIONS)
            return
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setFailedStep(Steps.NONE)
        }
        break
      case Steps.PERSON:
        {
          const errors = await actions.validateForm()
          if (errors.person) {
            setFailedStep(Steps.PERSON)
            return
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setFailedStep(Steps.NONE)
        }
        break
      default:
        return 'Unknown step'
    }
  }

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 2
  }

  const isThankYouStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 1
  }

  return (
    <GenericForm<SupportFormData>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema[activeStep]}
      innerRef={formRef}>
      <Hidden mdDown>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<StepConnector sx={{ mt: 1.5 }} />}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel error={isStepFailed(index)} StepIconComponent={StepIcon}>
                {t(step.label)}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Hidden>
      {isThankYouStep(activeStep, steps) ? (
        steps[activeStep].component
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container justifyContent="center">
            <Grid item xs={12} sx={{ mt: 1, mb: 5 }}>
              {steps[activeStep].component}
            </Grid>
            <Grid item xs={12} sx={(theme) => ({ '& button': { minWidth: theme.spacing(12) } })}>
              <Actions
                disableBack={activeStep === 0}
                onBack={handleBack}
                loading={mutation.isLoading}
                nextLabel={
                  isLastStep(activeStep, steps) ? 'support:cta.submit' : 'support:cta.next'
                }
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </GenericForm>
  )
}
