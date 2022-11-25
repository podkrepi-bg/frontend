import { styled } from '@mui/material/styles'
import { Grid, Step, StepConnector, Stepper } from '@mui/material'

import theme from 'common/theme'

export const StyledStep = styled(Step)(() => ({
  padding: 0,

  '& span': {
    padding: 0,
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
