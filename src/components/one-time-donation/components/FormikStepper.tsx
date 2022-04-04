import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import React, { useState } from 'react'

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label?: string
  key: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

const useStyles = makeStyles(() => ({
  customLabelStyle: {
    transform: 'scale(1.55)',
  },
  stepper: {
    marginTop: '49px',
    maxWidth: '662px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  btnBack: {
    background: 'rgba(255, 255, 255, 0.85)',
    border: '1px solid #000000',
    boxSizing: 'border-box',
    borderRadius: '60px',
    width: '284px',
    height: '80px',
    fontSize: '22px',
    marginRight: '51px',
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

export function FormikStepper({ children, ...props }: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[]
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  const [completed, setCompleted] = useState(false)
  const classes = useStyles()

  function isLastStep() {
    return step === childrenArray.length - 1
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setCompleted(true)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}>
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Grid className={classes.stepper}>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={child.props.key} completed={step > index || completed}>
                  <StepLabel classes={{ iconContainer: classes.customLabelStyle }}>
                    {child.props.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          {currentChild}

          <Grid className={classes.stepper}>
            <Button
              className={classes.btnBack}
              disabled={isSubmitting}
              onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            <Button
              className={classes.btn}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              color="inherit"
              type="submit">
              {isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
