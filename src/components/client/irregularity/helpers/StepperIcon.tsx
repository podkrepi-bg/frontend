import React from 'react'

import { StepIconProps } from '@mui/material/StepIcon'

import { StyledStepperIcon } from './IrregularityForm.styled'

export default function StepIcon(props: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <span>1</span>,
    2: <span>2</span>,
    3: <span>3</span>,
  }

  return <StyledStepperIcon>{icons[String(props.icon)]}</StyledStepperIcon>
}
