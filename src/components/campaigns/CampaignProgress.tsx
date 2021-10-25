import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Grid, Typography } from '@material-ui/core'
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    padding: theme.spacing(1),
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress)

const useStyles = makeStyles((theme) => ({
  donationProgress: {
    width: '100%',

    '> div p': {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    },
  },

  cardActions: {
    padding: '0',
  },
}))

type Props = {
  raised: string | number
  goal: string | number
  percentage: number
}
export default function CampaignProgress({ raised, goal, percentage }: Props) {
  const classes = useStyles()

  return (
    <Grid className={classes.donationProgress} container>
      <Grid item xs={12}>
        <BorderLinearProgress variant="determinate" value={percentage} />
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom={true} color="primary" variant="body1" align="left">
          {raised}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom={true} color="primary" variant="body1" align="right">
          {goal}
        </Typography>
      </Grid>
    </Grid>
  )
}
