import React from 'react'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { Box, Grid, Stepper, Step, StepLabel, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type StepType = {
  label: 'string'
  component: React.ReactElement
}
type StepsMap = {
  [key: number]: StepType
}

type Props = {
  steps: StepsMap
}

export default function CustomHorizontalStepper({ steps }: Props) {
  const [activeStep, setActiveStep] = React.useState(0)
  const [skipped, setSkipped] = React.useState(new Set<number>())
  const { t } = useTranslation('campaigns')

  const labels = []
  for (const step of steps.values()) {
    labels.push(step.label)
  }

  /***
   * In case you need to have optional steps,
   * you can add their index in the optionalSteps array
   * **/
  const optionalSteps = []

  const isStepOptional = (step: number) => {
    return optionalSteps.includes(step)
  }

  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {labels.map((label, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {activeStep === steps.size ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
        </>
      ) : (
        <>
          {steps.get(activeStep).component}

          <Box mt={6}>
            <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
              <Grid item>
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
                  {t('back')}
                </Button>
              </Grid>

              <Grid item>
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip}>
                    Skip
                  </Button>
                )}
              </Grid>

              <Grid item>
                <Button onClick={handleNext} variant="contained" endIcon={<ChevronRightIcon />}>
                  {t('next')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  )
}
