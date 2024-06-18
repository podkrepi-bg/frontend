import { Grid, StepLabel } from '@mui/material'
import { useCallback, useState } from 'react'
import {
  Step as StepType,
  CampaignApplicationFormData,
  Steps,
} from './helpers/campaignApplication.types'

import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplicationFormActions from './CampaignApplicationFormActions'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplication from './steps/CampaignApplication'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'
import GenericForm from 'components/common/form/GenericForm'
import {
  ActionsContainer,
  StyledCampaignApplicationStep,
  StyledCampaignApplicationStepper,
  StyledStepConnector,
} from './helpers/campaignApplication.styled'

const initialValues: CampaignApplicationFormData = {}

export default function CampaignApplicationForm() {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)

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

  const handleSubmit = () => {}

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [])

  return (
    <GenericForm<CampaignApplicationFormData> onSubmit={handleSubmit} initialValues={initialValues}>
      <StyledCampaignApplicationStepper activeStep={activeStep} connector={<StyledStepConnector />}>
        {steps.map((step) => (
          <StyledCampaignApplicationStep key={step.title}>
            <StepLabel StepIconComponent={CampaignApplicationStepperIcon} />
          </StyledCampaignApplicationStep>
        ))}
      </StyledCampaignApplicationStepper>
      <ActionsContainer container spacing={5}>
        <Grid container item xs={12}>
          {activeStep < steps.length && steps[activeStep].component}
        </Grid>
        <Grid container item spacing={3}>
          <CampaignApplicationFormActions activeStep={activeStep} onBack={handleBack} />
        </Grid>
      </ActionsContainer>
    </GenericForm>
  )
}
