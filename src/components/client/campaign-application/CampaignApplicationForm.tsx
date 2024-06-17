import { StepLabel } from '@mui/material'
import { useState } from 'react'
import {
  Step as StepType,
  CampaignApplicationFormData,
  Steps,
} from './helpers/campaignApplication.types'

import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplication from './steps/CampaignApplication'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'
import GenericForm from 'components/common/form/GenericForm'
import {
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

  return (
    <GenericForm<CampaignApplicationFormData> onSubmit={handleSubmit} initialValues={initialValues}>
      <StyledCampaignApplicationStepper activeStep={activeStep} connector={<StyledStepConnector />}>
        {steps.map((step) => (
          <StyledCampaignApplicationStep key={step.title}>
            <StepLabel StepIconComponent={CampaignApplicationStepperIcon} />
          </StyledCampaignApplicationStep>
        ))}
      </StyledCampaignApplicationStepper>
      {steps[activeStep].component}
    </GenericForm>
  )
}
