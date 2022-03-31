import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {
  Divider,
  Grid,
  Stack,
  StepButton,
  StepConnector,
  stepConnectorClasses,
} from '@mui/material'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import Success from './Success'
import { SupervisorAccount } from '@mui/icons-material'
import SuccesButtons from './SuccessButtons'
import { styled } from '@mui/system'
import { makeStyles } from '@mui/styles'
const steps = [
  {
    label: 'First Step',
    description: <FirstStep />,
  },
  {
    label: 'Second Step',
    description: <SecondStep />,
  },
  {
    label: 'Third Step',
    description: <ThirdStep />,
  },
  {
    label: 'Success',
    description: <Success />,
  },
]
const useStyles = makeStyles(() => ({
  customLabelStyle: {
    transform: 'scale(1.85)',
  },
  btnBack: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '60px',
    width: '284px',
    height: '80px',
    fontSize: '22px',
  },
  btn: {
    background: '#62C4FB',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '60px',
    width: '284px',
    height: '80px',
    fontSize: '22px',
  },
}))
export default function VerticalLinearStepper() {
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box>
      <Grid my={5}>
        <Stepper nonLinear activeStep={activeStep} connector={<StepConnector />} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel classes={{ iconContainer: classes.customLabelStyle }}>{null}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
      {steps[activeStep].description}
      <Grid container justifyContent="space-between" mx={25} xs={6.5} my={7} direction="row">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          color="inherit"
          className={classes.btnBack}>
          Назад
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleNext}
          className={classes.btn}
          endIcon={<ArrowForwardIosIcon />}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Напред'}
        </Button>
      </Grid>

      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos,re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}
