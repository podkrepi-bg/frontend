import React from 'react'
import { FormikHelpers } from 'formik'

import { Steps, IrregularityFormData } from './helpers/irregularity.types'

interface Props {
  activeStep: Steps
  actions: FormikHelpers<IrregularityFormData>
  setActiveStep: (value: React.SetStateAction<Steps>) => void
  setFailedStep: (value: React.SetStateAction<Steps>) => void
}

export default async function stepsHandler({
  actions,
  activeStep,
  setActiveStep,
  setFailedStep,
}: Props) {
  switch (activeStep) {
    case Steps.GREETING:
      {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.CONTACTS:
      {
        const errors = await actions.validateForm()
        if (errors.person) {
          setFailedStep(Steps.CONTACTS)
          return
        }
        if (errors.status) {
          setFailedStep(Steps.CONTACTS)
          return
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
        setFailedStep(Steps.NONE)
      }
      break
    case Steps.INFO:
      {
        const errors = await actions.validateForm()
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
