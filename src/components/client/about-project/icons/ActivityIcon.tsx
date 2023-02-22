import React from 'react'

import { SvgIconProps } from '@mui/material'

import { Root, Count, Text } from '../AboutProject.styled'

type ActivityIconProps = {
  Icon: React.ComponentType<SvgIconProps>
  count?: string
  description: string
}

export default function ActivityIcon({ Icon, count, description, ...props }: ActivityIconProps) {
  return (
    <Root>
      <Icon {...props} />
      <Count>{count}</Count>
      <Text>{description}</Text>
    </Root>
  )
}
