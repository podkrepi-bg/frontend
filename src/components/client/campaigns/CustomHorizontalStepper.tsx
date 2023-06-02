import React, { useContext } from 'react'
import { Box, Grid, Button, Stepper, Step, StepLabel, Typography } from '@mui/material'
import { CampaignContext } from 'context/create-campaign'

import HSCreateForm from 'components/client/campaigns/stepOne/HSCreateForm'
// TODO: Fix the Typescript errors
export default function CustomHorizontalStepper() {
  const ctx = useContext(CampaignContext)

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={ctx.activeStep}>
        {ctx.steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {}
          const labelProps: {
            optional?: React.ReactNode
          } = {}
          if (ctx.isStepOptional && ctx.isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>
          }
          if (ctx.isStepSkipped && ctx.isStepSkipped(index)) {
            stepProps.completed = false
          }
          return (
            <Step key={index} {...stepProps}>
              <StepLabel {...labelProps}>{step.title}</StepLabel>
            </Step>
          )
        })}
      </Stepper>

      {ctx.activeStep === ctx.steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
        </>
      ) : (
        <>
          {ctx.activeStep === 0 && <HSCreateForm />}
          {ctx.activeStep === 1 && <Box>Page {ctx.activeStep}</Box>}
          {ctx.activeStep === 2 && <Box>Page {ctx.activeStep}</Box>}
          {ctx.activeStep === 3 && <Box>Page {ctx.activeStep}</Box>}
          {ctx.activeStep === 4 && <Box>Page {ctx.activeStep}</Box>}

          {/* Action Buttons */}
          {/* <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
            <Grid item>
              <Button onClick={ctx.prevPage} variant="outlined">
                back
              </Button>
            </Grid>

            <Grid item>
              <Button onClick={ctx.nextPage} disabled={false} variant="contained" color="success">
                next
              </Button>
            </Grid>
          </Grid> */}
        </>
      )}
    </Box>
  )
}
