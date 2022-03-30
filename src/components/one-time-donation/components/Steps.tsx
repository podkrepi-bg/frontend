import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Grid, Stack } from '@mui/material'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
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
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
]

export default function VerticalLinearStepper() {
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
    <Box mx={25} sx={{ marginTop: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{null}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].description}
      <Grid my={7} direction="row">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          color="inherit"
          sx={{
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid #000000',
            boxSizing: 'border-box',
            borderRadius: '60px',
            width: '284px',
            height: '80px',
            marginRight: '51px',
            fontSize: '22px',
          }}>
          Назад
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleNext}
          sx={{
            background: '#62C4FB',
            border: '1px solid #000000',
            boxSizing: 'border-box',
            borderRadius: '60px',
            width: '284px',
            height: '80px',
            fontSize: '22px',
          }}
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
