import React from 'react'

import { Typography, SvgIconProps, Grid } from '@mui/material'

import { ContentContainer, StyledCardHeader, PrincipleHeading } from './PrincipleCard.styled'

type PrincipleCardProps = {
  Icon: React.ComponentType<SvgIconProps>
  heading?: string
  content: string
}

export default function PrincipleCard({ Icon, heading, content }: PrincipleCardProps) {
  return (
    <Grid>
      <StyledCardHeader
        avatar={<Icon fontSize="large" />}
        title={<PrincipleHeading variant="body2">{heading}</PrincipleHeading>}
      />
      <ContentContainer>
        <Typography variant="body1">{content}</Typography>
      </ContentContainer>
    </Grid>
  )
}
