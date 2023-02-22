import { styled } from '@mui/material/styles'
import { Grid, Step, StepConnector, Stepper } from '@mui/material'

import theme from 'common/theme'

export const StyledStep = styled(Step)(() => ({
  padding: 0,

  '& span': {
    padding: 0,
  },

  '& .Mui-active': {
    backgroundColor: theme.palette.info.light,
    height: theme.spacing(5.25),
    width: theme.spacing(5.25),
    borderRadius: theme.borders.round,

    '& span': {
      color: theme.palette.common.white,
    },
  },
}))

export const StyledStepper = styled(Stepper)(() => ({
  backgroundColor: 'transparent',
  margin: theme.spacing(10, 0, 8, 0),
  alignItems: 'center',

  [theme.breakpoints.down('sm')]: { display: 'none' },
}))

export const Instructions = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'center',
  marginTop: theme.spacing(1),
}))

export const ColorlibConnector = styled(StepConnector)(() => ({
  height: 3,
  backgroundColor: theme.palette.info.light,
}))

export const StyledStepperIcon = styled(Grid)(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.borders.round,
  border: `3px solid ${theme.palette.info.light}`,
  color: theme.palette.common.black,
  display: 'flex',
  width: theme.spacing(5),
  height: theme.spacing(5),
  zIndex: 1,
  fontSize: theme.typography.pxToRem(28),
}))
