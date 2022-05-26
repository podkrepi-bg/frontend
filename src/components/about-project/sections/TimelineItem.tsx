import React from 'react'

import { styled } from '@mui/material/styles'

import { Card, SvgIconProps, Typography, CardContent, CardHeader } from '@mui/material'
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem as TimelineItemMaterial,
  TimelineItemProps as TimelineItemPropsMaterial,
  TimelineSeparator,
} from '@mui/lab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const PREFIX = 'TimelineItem'

const classes = {
  connector: `${PREFIX}-connector`,
  arrowIcon: `${PREFIX}-arrowIcon`,
  icon: `${PREFIX}-icon`,
  contentContainer: `${PREFIX}-contentContainer`,
  contentPaper: `${PREFIX}-contentPaper`,
  content: `${PREFIX}-content`,
  timelineItem: `${PREFIX}-timelineItem`,
}

const StyledTimelineItemMaterial = styled(TimelineItemMaterial)(({ theme }) => ({
  [`& .${classes.connector}`]: {
    height: theme.spacing(10),
  },

  [`& .${classes.arrowIcon}`]: {
    transform: 'rotate(90deg)',
  },

  [`& .${classes.icon}`]: {
    fontSize: theme.typography.pxToRem(40),
    padding: '.5rem',
    boxSizing: 'content-box',
  },

  [`& .${classes.contentContainer}`]: {},

  [`& .${classes.contentPaper}`]: {
    borderTop: `3px solid ${theme.palette.secondary.main}`,
    textAlign: 'left',
    padding: theme.spacing(2.5),
  },

  [`& .${classes.content}`]: {
    paddingTop: theme.spacing(1),
    paddingRight: 0,
    '&:last-child': {
      paddingBottom: theme.spacing(1),
    },
    '& ul': {
      listStyleType: 'disc',
      paddingLeft: theme.spacing(2),
    },
  },

  [`&.${classes.timelineItem}`]: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}))

type TimelineItemProps = React.PropsWithChildren<
  TimelineItemPropsMaterial & {
    title?: string
    lastItem?: boolean
    Icon: React.ComponentType<SvgIconProps>
  }
>

export default function TimelineItem({ children, title, lastItem, Icon }: TimelineItemProps) {
  return (
    <StyledTimelineItemMaterial className={classes.timelineItem}>
      <TimelineSeparator>
        <Icon className={classes.icon} color="primary" />
        <TimelineConnector className={classes.connector} />
        {lastItem ? <ArrowForwardIosIcon className={classes.arrowIcon} color="primary" /> : ''}
      </TimelineSeparator>
      <TimelineContent classes={{ root: classes.contentContainer }}>
        <Card variant="outlined" className={classes.contentPaper}>
          {title && <CardHeader titleTypographyProps={{ color: 'textSecondary' }} title={title} />}
          <CardContent className={classes.content}>
            <Typography variant="body2" component="div">
              {children}
            </Typography>
          </CardContent>
        </Card>
      </TimelineContent>
    </StyledTimelineItemMaterial>
  )
}
