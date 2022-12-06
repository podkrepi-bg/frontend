import React, { useMemo } from 'react'
import { styled } from '@mui/material/styles'
import LinearProgress from '@mui/material/LinearProgress'
import { Unstable_Grid2 as Grid2, Grid2Props } from '@mui/material'
const PREFIX = 'CampaignProgress'

const classes = {
  root: `${PREFIX}-root`,
  bar: `${PREFIX}-bar`,
  donationProgress: `${PREFIX}-donationProgress`,
  cardActions: `${PREFIX}-cardActions`,
}

const StyledGrid = styled(Grid2)(({ theme }) => ({
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

interface Props extends Grid2Props {
  raised: number
  target: number
}
export default function CampaignProgress({ raised, target, ...props }: Props) {
  const percentage = useMemo(() => (raised / target) * 100, [raised, target])
  return (
    <StyledGrid className={classes.donationProgress} container {...props}>
      <Grid2 xs={12}>
        <LinearProgress
          variant="determinate"
          value={percentage > 100 ? 100 : percentage}
          classes={{
            root: classes.root,
            bar: classes.bar,
          }}
        />
      </Grid2>
    </StyledGrid>
  )
}
