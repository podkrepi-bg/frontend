import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

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
    <Box sx={{ marginTop: 5 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepLabel>{null}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps[activeStep].description}
      <Stack direction="row">
        <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
          {activeStep === steps.length - 1 ? 'Finish' : 'Continue'}
        </Button>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </Stack>

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
