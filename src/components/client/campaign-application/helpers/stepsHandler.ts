import { SetStateAction } from 'react'

import { Steps } from './campaignApplication.types'

interface stepsHandlerProps {
  activeStep: Steps
  setActiveStep: (value: SetStateAction<Steps>) => void
}

export default function stepsHandler({ activeStep, setActiveStep }: stepsHandlerProps) {
  switch (activeStep) {
    case Steps.ORGANIZER:
      {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
      break
    case Steps.CAMPAIGN:
      {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
      break
    case Steps.CAMPAIGN_DETAILS:
      {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      }
      break
    default:
      return 'Unknown step'
  }
}
