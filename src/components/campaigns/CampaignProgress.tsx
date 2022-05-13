import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import { Grid } from '@mui/material'
const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  cardActions: `${PREFIX}-cardActions`,
}

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.donationProgress}`]: {
    width: '100%',
    '> div p': {
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
    },
  },

  [`& .${classes.cardActions}`]: {
    padding: '0',
  },
}))

const BorderLinearProgress = LinearProgress

type Props = {
  raised: number
  target: number
}
export default function CampaignProgress({ raised, target }: Props) {
  const percentage = useMemo(() => (raised / target) * 100, [raised, target])
  return (
    <StyledGrid className={classes.donationProgress} container>
      <Grid item xs={12}>
        <BorderLinearProgress
          variant="determinate"
          value={percentage > 100 ? 100 : percentage}
          classes={{
            root: classes.root,
            bar: classes.bar,
          }}
        />
      </Grid>
      {/* <Grid item xs={6}>
        <Typography gutterBottom color="primary" variant="body1" align="left">
          {money(raised)}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography gutterBottom color="primary" variant="body1" align="right">
          {money(target)}
        </Typography>
        {raised > target && (
          <Typography gutterBottom color="primary" variant="body1" align="right">
            (+ {money(raised - target)})
          </Typography>
        )}
      </Grid> */}
    </StyledGrid>
  )
}
