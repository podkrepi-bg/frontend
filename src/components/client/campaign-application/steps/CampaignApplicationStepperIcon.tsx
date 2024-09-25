import { StepIconProps } from '@mui/material/StepIcon'
import { StyledCampaignApplicationStepperIcon } from '../helpers/campaignApplication.styled'

export default function CampaignApplicationStepperIcon(props: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <span>1</span>,
    2: <span>2</span>,
    3: <span>3</span>,
  }

  return (
    <StyledCampaignApplicationStepperIcon>
      {icons[String(props.icon)]}
    </StyledCampaignApplicationStepperIcon>
  )
}
