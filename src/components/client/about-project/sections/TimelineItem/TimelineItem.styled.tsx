import { styled } from '@mui/system'
import { TimelineConnector, TimelineItem } from '@mui/lab'
import { Grid, Card, CardContent } from '@mui/material'

import theme from 'common/theme'

export const Root = styled(TimelineItem)(() => ({
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}))

export const Connector = styled(TimelineConnector)(() => ({
  height: theme.spacing(10),
}))

export const TimelineIcon = styled(Grid)(() => ({
  '& > svg': {
    fontSize: theme.typography.pxToRem(40),
    padding: theme.spacing(1),
    boxSizing: 'content-box',
  },
}))

export const ContentPaper = styled(Card)(() => ({
  borderTop: `3px solid ${theme.palette.secondary.main}`,
  textAlign: 'left',
  padding: theme.spacing(2.5),
}))

export const Content = styled(CardContent)(() => ({
  paddingTop: theme.spacing(1),
  paddingRight: 0,
  '&:last-child': {
    paddingBottom: theme.spacing(1),
  },
  '& ul': {
    listStyleType: 'disc',
    paddingLeft: theme.spacing(2),
  },
}))
