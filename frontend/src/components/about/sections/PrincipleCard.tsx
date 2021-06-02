import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Typography, CardContent, CardHeader, Card, SvgIcon } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: { backgroundColor: grey[50] },
    contentContainer: {
      padding: theme.spacing(0),
      margin: theme.spacing(2, 0),
      '&:last-child': {
        paddingBottom: theme.spacing(0),
      },
    },
    heading: {
      color: theme.palette.primary.main,
      display: 'block',
      fontSize: theme.typography.pxToRem(18),
    },
    content: {
      marginBottom: theme.spacing(0),
      paddingRight: theme.spacing(6),
    },
    cardHeader: {
      padding: theme.spacing(0),
    },
    cardHeaderAction: {
      margin: theme.spacing(0),
      alignSelf: 'center',
    },
    cardHeaderTitleRoot: {
      flexGrow: 1,
      flex: 0,
    },
    icon: {
      fontSize: theme.spacing(5),
    },
  }),
)

type PrincipleCardProps = {
  Icon: typeof SvgIcon
  heading?: string
  content: string
}

export default function PrincipleCard({ Icon, heading, content }: PrincipleCardProps) {
  const classes = useStyles()
  return (
    <Card elevation={0} className={classes.container}>
      <CardHeader
        className={classes.cardHeader}
        avatar={<Icon className={classes.icon} />}
        title={
          <Typography variant="body2" component="div" className={classes.heading}>
            {heading}
          </Typography>
        }
        classes={{
          action: classes.cardHeaderAction,
          content: classes.cardHeaderTitleRoot,
        }}
      />
      <CardContent className={classes.contentContainer}>
        <Typography className={classes.content} variant="body1">
          {content}
        </Typography>
      </CardContent>
    </Card>
  )
}
