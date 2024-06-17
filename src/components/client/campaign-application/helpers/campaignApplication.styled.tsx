import { styled } from '@mui/material/styles'
import { Grid, Step, StepConnector, Stepper } from '@mui/material'

import theme from 'common/theme'

export const StyledCampaignApplicationStep = styled(Step)(() => ({
  padding: 0,

  '& span': {
    padding: 0,
  },

  '& .Mui-active': {
    backgroundColor: theme.palette.primary.light,
    height: theme.spacing(9.25),
    width: theme.spacing(9.25),
    borderRadius: theme.borders.round,

    '& span': {
      color: theme.palette.common.white,
    },
  },
}))

export const StyledCampaignApplicationStepper = styled(Stepper)(() => ({
  backgroundColor: 'transparent',
  margin: theme.spacing(10, 0, 8, 0),
  alignItems: 'center',
}))

export const StyledStepConnector = styled(StepConnector)(() => ({
  height: 5,
  backgroundColor: theme.palette.primary.light,

  '& span': {
    border: 'none',
  },
}))

export const StyledCampaignApplicationStepperIcon = styled(Grid)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.borders.round,
  border: `5px solid ${theme.palette.primary.light}`,
  color: theme.palette.common.black,
  display: 'flex',
  width: theme.spacing(9),
  height: theme.spacing(9),
  zIndex: 1,
  fontSize: theme.typography.pxToRem(28),
}))
