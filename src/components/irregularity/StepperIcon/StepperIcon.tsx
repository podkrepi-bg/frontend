import React from 'react'

import { StepIconProps } from '@mui/material/StepIcon'

import { Root } from './StepperIcon.styled'

export default function StepIcon(props: StepIconProps) {
  const icons: { [index: string]: React.ReactElement } = {
    1: <span>1</span>,
    2: <span>2</span>,
    3: <span>3</span>,
  }

  return <Root>{icons[String(props.icon)]}</Root>
}
