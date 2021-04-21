import React from 'react'

import { createStyles, makeStyles, Paper, SvgIcon, Theme } from '@material-ui/core'
import {
  TimelineConnector,
  TimelineContent,
  TimelineItem as TimelineItemMaterial,
  TimelineItemProps as TimelineItemPropsMaterial,
  TimelineSeparator,
} from '@material-ui/lab'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

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
    },
    contentContainer: {
      textAlign: 'center',
    },
  }),
)
type TimelineItemProps = React.PropsWithChildren<
  TimelineItemPropsMaterial & { lastItem?: boolean; Icon: typeof SvgIcon }
>

export default function TimelineItem({ children, lastItem, Icon }: TimelineItemProps) {
  const classes = useStyles()
  return (
    <TimelineItemMaterial>
      <TimelineSeparator>
        <Icon className={classes.icon} color="primary" />
        <TimelineConnector className={classes.connector} />
        {lastItem ? <ArrowForwardIosIcon className={classes.arrowIcon} color="primary" /> : ''}
      </TimelineSeparator>
      <TimelineContent classes={{ root: classes.contentContainer }}>
        <Paper className={classes.contentContainer}>{children}</Paper>
      </TimelineContent>
    </TimelineItemMaterial>
  )
}
