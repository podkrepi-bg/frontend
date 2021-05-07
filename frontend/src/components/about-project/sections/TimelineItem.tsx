import React from 'react'

import {
  createStyles,
  makeStyles,
  Card,
  SvgIcon,
  Theme,
  Typography,
  CardContent,
  CardHeader,
} from '@material-ui/core'
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
      // backgroundColor: theme.palette.primary.dark,
      padding: '.5rem',
      // borderRadius: '50%',
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
  }),
)
type TimelineItemProps = React.PropsWithChildren<
  TimelineItemPropsMaterial & {
    title?: string
    lastItem?: boolean
    Icon: typeof SvgIcon
  }
>

export default function TimelineItem({ children, title, lastItem, Icon }: TimelineItemProps) {
  const classes = useStyles()
  return (
    <TimelineItemMaterial>
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
