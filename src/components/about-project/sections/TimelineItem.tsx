import React from 'react'

import { Card, SvgIconProps, Theme, Typography, CardContent, CardHeader } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem as TimelineItemMaterial,
  TimelineItemProps as TimelineItemPropsMaterial,
  TimelineSeparator,
} from '@mui/lab'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    connector: {
      height: theme.spacing(10),
    },
    arrowIcon: {
      transform: 'rotate(90deg)',
    },
    icon: {
      fontSize: theme.typography.pxToRem(40),
      padding: '.5rem',
      boxSizing: 'content-box',
    },
    contentContainer: {},
    contentPaper: {
      borderTop: `3px solid ${theme.palette.secondary.main}`,
      textAlign: 'left',
      padding: theme.spacing(2.5),
    },
    content: {
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
    timelineItem: {
      [theme.breakpoints.down('md')]: {
        display: 'block',
      },
    },
  }),
)
type TimelineItemProps = React.PropsWithChildren<
  TimelineItemPropsMaterial & {
    title?: string
    lastItem?: boolean
    Icon: React.ComponentType<SvgIconProps>
  }
>

export default function TimelineItem({ children, title, lastItem, Icon }: TimelineItemProps) {
  const classes = useStyles()
  return (
    <TimelineItemMaterial className={classes.timelineItem}>
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
    </TimelineItemMaterial>
  )
}
