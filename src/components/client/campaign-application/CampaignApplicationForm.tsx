import { useCallback, useState } from 'react'

import { Grid, StepLabel } from '@mui/material'

import { Step as StepType, Steps } from './helpers/campaignApplication.types'

import GenericForm from 'components/common/form/GenericForm'
import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplication from './steps/CampaignApplication'
import CampaignApplicationFormActions from './CampaignApplicationFormActions'
import CampaignApplicationRemark from './CampaignApplicationRemark'
import stepsHandler from './helpers/stepsHandler'

import {
  StyledCampaignApplicationStep,
  StyledCampaignApplicationStepper,
  StyledStepConnector,
} from './helpers/campaignApplication.styled'

const initialValues: Record<string, string> = {}

const steps: StepType[] = [
  {
    title: 'campaign-application:steps.organizer.title',
    component: <CampaignApplicationOrganizer />,
  },
  {
    title: 'campaign-application:steps.campaign-application.title',
    component: <CampaignApplication />,
  },
  {
    title: 'campaign-application:steps.campaign-application-details.title',
    component: <CampaignApplicationDetails />,
  },
]

export default function CampaignApplicationForm() {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)

  const handleSubmit = () => {
    stepsHandler({ activeStep, setActiveStep })
  }

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [])

  return (
    <>
      <GenericForm<Record<string, string>> onSubmit={handleSubmit} initialValues={initialValues}>
        <StyledCampaignApplicationStepper
          activeStep={activeStep}
          connector={<StyledStepConnector />}>
          {steps.map((step) => (
            <StyledCampaignApplicationStep key={step.title}>
              <StepLabel StepIconComponent={CampaignApplicationStepperIcon} />
            </StyledCampaignApplicationStep>
          ))}
        </StyledCampaignApplicationStepper>
        <Grid container>
          <Grid container item xs={12}>
            {activeStep < steps.length && steps[activeStep].component}
          </Grid>
          <Grid container item alignContent="center">
            <CampaignApplicationFormActions activeStep={activeStep} onBack={handleBack} />
          </Grid>
        </Grid>
      </GenericForm>
      {(activeStep === Steps.ORGANIZER || activeStep === Steps.CAMPAIGN) && (
        <CampaignApplicationRemark />
      )}
    </>
  )
}
