import React, { useState, useRef } from 'react'

import { useTranslation } from 'next-i18next'

import { Person } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'

import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers, FormikProps } from 'formik'

import { StepLabel, Grid } from '@mui/material'

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { createIrregularity, uploadIrregularityFiles } from 'service/irregularity'

import {
  Steps,
  Step as StepType,
  IrregularityFormData,
  IrregularityStatus,
  NotifierTypes,
  IrregularityInput,
  IrregularityResponse,
  IrregularityReason,
  IrregularityUploadImage,
  UploadIrregularityFiles,
} from './irregularity.types'
import { validationSchema } from './validation-schema'

import Actions from '../Actions'
import Info from '../steps/Info'
import Fail from './Fail'
import StepIcon from './StepperIcon'
import Remark from './Remark'
import Greeting from '../steps/Greeting'
import Contacts from '../steps/Contacts'
import Success from './Success'
import stepsHandler from '../StepsHandler'
import GenericForm from 'components/common/form/GenericForm'

import {
  ColorlibConnector,
  Instructions,
  StyledStep,
  StyledStepper,
} from './IrregularityForm.styled'

const isFirstStep = (activeStep: number, steps: StepType[]): boolean => {
  return activeStep === steps.length - 3
}

const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
  return activeStep === steps.length - 1
}

const initialValues: IrregularityFormData = {
  status: IrregularityStatus.INITIAL,
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  info: {
    campaignId: '',
    description: '',
    notifierType: NotifierTypes.OTHER,
    reason: IrregularityReason.OTHER,
  },
}

type Props = {
  campaign: CampaignResponse
  person?: Person
}

export default function IrregularityForm({ campaign, person }: Props) {
  const { t } = useTranslation('irregularity')

  const formRef = useRef<FormikProps<IrregularityFormData>>(null)

  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [activeStep, setActiveStep] = useState<Steps>(Steps.GREETING)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  const steps: StepType[] = [
    {
      component: <Greeting />,
    },
    {
      component: <Contacts />,
    },
    {
      component: <Info files={files} setFiles={setFiles} />,
    },
  ]

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const mutation = useMutation<
    AxiosResponse<IrregularityResponse>,
    AxiosError<ApiErrors>,
    IrregularityInput
  >({
    mutationFn: createIrregularity,
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<IrregularityUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadIrregularityFiles
  >({
    mutationFn: uploadIrregularityFiles(),
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (
    values: IrregularityFormData,
    actions: FormikHelpers<IrregularityFormData>,
  ) => {
    if (isLastStep(activeStep, steps)) {
      const errors = await actions.validateForm(values)
      const hasErrors = !!Object.keys(errors).length
      if (hasErrors) {
        setFailedStep(Steps.INFO)
        return
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setFailedStep(Steps.NONE)
      try {
        const data: IrregularityInput = {
          campaignId: values.info.campaignId,
          description: values.info.description,
          notifierType: values.info.notifierType,
          reason: values.info.reason,
          status: values.status,
          person: {
            firstName: values.person.firstName,
            lastName: values.person.lastName,
            email: values.person.email,
            phone: values.person.phone,
          },
        }
        const response = await mutation.mutateAsync(data)
        await fileUploadMutation.mutateAsync({
          files,
          irregularityId: response.data.id,
        })
        actions.resetForm()
        setSuccess(true)
      } catch (error) {
        console.error(error)
        setFail(true)
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

    initialValues.info.campaignId = campaign.id
    initialValues.person.firstName = person?.firstName || ''
    initialValues.person.lastName = person?.lastName || ''
    initialValues.person.email = person?.email || ''
    initialValues.person.phone = person?.phone || ''

    await stepsHandler({ actions, activeStep, setActiveStep, setFailedStep })
  }

  if (success) {
    return <Success />
  }

  if (fail) {
    return <Fail setFail={setFail} setActiveStep={setActiveStep} />
  }

  return (
    <>
      <GenericForm<IrregularityFormData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema[activeStep]}
        innerRef={formRef}>
        <StyledStepper activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((step, index) => (
            <StyledStep key={index}>
              <StepLabel error={isStepFailed(index)} StepIconComponent={StepIcon} />
            </StyledStep>
          ))}
        </StyledStepper>
        <Instructions container spacing={5}>
          <Grid container item xs={12}>
            {activeStep < steps.length && steps[activeStep].component}
          </Grid>
          <Grid container item spacing={3}>
            <Actions
              activeStep={activeStep}
              disableBack={activeStep === 0}
              onBack={handleBack}
              loading={mutation.isLoading}
              campaign={campaign}
              nextLabel={isLastStep(activeStep, steps) ? 'cta.submit' : 'cta.next'}
              backLabel={isFirstStep(activeStep, steps) ? 'cta.back-to-campaign' : 'cta.back'}
            />
          </Grid>
        </Instructions>
      </GenericForm>
      {activeStep === Steps.GREETING && <Remark text={t('steps.greeting.remark')} />}
      {activeStep === Steps.CONTACTS && <Remark text={t('steps.contacts.remark')} />}
    </>
  )
}
