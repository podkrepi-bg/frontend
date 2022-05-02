import React from 'react'
import { FormikHelpers } from 'formik'

import { Steps, ReportFormData } from './helpers/report.types'

interface Props {
  initialValues: ReportFormData
  values: ReportFormData
  actions: FormikHelpers<ReportFormData>
  activeStep: Steps
  setActiveStep: (value: React.SetStateAction<Steps>) => void
  setFailedStep: (value: React.SetStateAction<Steps>) => void
}

export default async function stepsHandler({
  initialValues,
  values,
  actions,
  activeStep,
  setActiveStep,
  setFailedStep,
}: Props) {
  switch (activeStep) {
    case Steps.GREETING:
      {
        console.log('1step', values)
        console.log(activeStep)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.CONTACTS:
      {
        console.log('2step', values)

        const errors = await actions.validateForm(values.person)
        if (errors.person) {
          setFailedStep(Steps.CONTACTS)
          return
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.INFO:
      {
        console.log('3step', values)

        const errors = await actions.validateForm(values.info)
        if (errors.info) {
          setFailedStep(Steps.INFO)
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
