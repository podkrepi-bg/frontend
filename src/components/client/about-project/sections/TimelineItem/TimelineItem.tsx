import React from 'react'

import { SvgIconProps, Typography, CardHeader } from '@mui/material'
import {
  TimelineContent,
  TimelineItemProps as TimelineItemPropsMaterial,
  TimelineSeparator,
} from '@mui/lab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import { Connector, Content, ContentPaper, Root, TimelineIcon } from './TimelineItem.styled'

type TimelineItemProps = React.PropsWithChildren<
  TimelineItemPropsMaterial & {
    title?: string
    lastItem?: boolean
    Icon: React.ComponentType<SvgIconProps>
  }
>
export default function TimelineItem({ children, title, lastItem, Icon }: TimelineItemProps) {
  return (
    <Root>
      <TimelineSeparator>
        <TimelineIcon>
          <Icon color="primary" />
        </TimelineIcon>
        <Connector />
        {lastItem ? <ArrowForwardIosIcon color="primary" /> : ''}
      </TimelineSeparator>
      <TimelineContent>
        <ContentPaper variant="outlined">
          {title && <CardHeader titleTypographyProps={{ color: 'textSecondary' }} title={title} />}
          <Content>
            <Typography variant="body2" component="div">
              {children}
            </Typography>
          </Content>
        </ContentPaper>
      </TimelineContent>
    </Root>
  )
}
