import { styled } from '@mui/material/styles'
import { Grid, Step, StepConnector, Stepper } from '@mui/material'
import Heading from 'components/common/Heading'
import FormTextField from 'components/common/form/FormTextField'
import theme from 'common/theme'

export const StyledCampaignApplicationStep = styled(Step)(() => ({
  padding: 0,

  '& span': {
    padding: 0,
  },

  '& .Mui-active': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.primary.main,
    height: '70px',
    width: '70px',
    borderRadius: theme.borders.round,

    '& span': {
      color: theme.palette.common.white,
      fontSize: theme.typography.pxToRem(48),
    },
  },
}))

export const StyledCampaignApplicationStepper = styled(Stepper)(() => ({
  backgroundColor: 'transparent',
  margin: '20px auto',
  maxWidth: '530px',
}))

export const StyledStepConnector = styled(StepConnector)(() => ({
  height: 5,
  backgroundColor: theme.palette.primary.main,

  '& span': {
    border: 'none',
  },
}))

export const StyledCampaignApplicationStepperIcon = styled(Grid)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.black,
  height: '52.05px',
  width: '52.05px',
  border: `5px solid ${theme.palette.primary.main}`,
  borderRadius: theme.borders.round,
  zIndex: 1,
  fontSize: theme.typography.pxToRem(36),
}))

export const StyledStepHeading = styled(Heading)(() => ({
  alignSelf: 'center',
  fontWeight: 600,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
}))

export const StyledFormTextField = styled(FormTextField)(() => ({
  borderRadius: theme.borders.round,
  height: theme.spacing(5),
}))
