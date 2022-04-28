import { Button, CircularProgress, Grid, Step, StepLabel, Stepper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { useTranslation } from 'next-i18next'
import React, { PropsWithChildren, useState } from 'react'

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label?: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

const useStyles = makeStyles(() => ({
  customLabelStyle: {
    transform: 'scale(1.55)',
  },
  stepper: {
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
export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export function FormikStepper<T>({ children, ...props }: GenericFormProps<T>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[]
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  // const [completed, setCompleted] = useState(false)
  const classes = useStyles()

  function isLastStep() {
    return step === childrenArray.length - 2
  }
  const { t } = useTranslation('one-time-donation')

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
          setStep((s) => s + 1)
          window.scrollTo({ top: 0 })
        } else {
          setStep((s) => s + 1)
          window.scrollTo({ top: 0 })
          helpers.setTouched({})
        }
      }}>
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Grid className={classes.stepper}>
            <Stepper nonLinear alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={index}>
                  <StepLabel classes={{ iconContainer: classes.customLabelStyle }}>
                    {child.props.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          {currentChild}

          <Grid className={classes.stepper} display={step === 3 ? 'none' : ''}>
            <Button
              className={classes.btnBack}
              disabled={isSubmitting}
              onClick={() => {
                setStep((s) => s - 1)
                window.scrollTo({ top: 0 })
              }}>
              {t('btns.back')}
            </Button>
            <Button
              className={classes.btn}
              startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
              disabled={isSubmitting}
              variant="contained"
              color="inherit"
              type="submit">
              {isSubmitting ? 'Потвърждение' : isLastStep() ? t('btns.end') : t('btns.next')}
            </Button>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
