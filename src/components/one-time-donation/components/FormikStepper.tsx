import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
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
  container: {
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
  stepIcon: {
    transform: 'scale(1.15)',
  },
}))
export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export function FormikStepper<T>({ children, ...props }: GenericFormProps<T>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[]
  const [step, setStep] = useState(0)
  const currentChild = childrenArray[step]
  const classes = useStyles()
  const { data: currentPerson } = useCurrentPerson()
  function isLastStep() {
    return step === childrenArray.length - 2
  }

  function isFirstStep() {
    return step === 0
  }

  function isLogged() {
    return currentPerson && currentPerson.status && currentPerson.status !== 'unauthenticated'
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
        } else if (isFirstStep() && isLogged()) {
          setStep((s) => s + 2)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
      validateOnBlur>
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit} className={classes.container} autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step key={index}>
                <StepLabel classes={{ alternativeLabel: classes.stepIcon }}>
                  {child.props.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box marginY={8}>{currentChild}</Box>
          {step === 3 ? null : (
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  type="button"
                  variant="text"
                  disabled={step === 0 || isSubmitting}
                  color="error"
                  size="large"
                  onClick={() => {
                    if (step === 2 && isLogged()) {
                      setStep((s) => s - 2)
                      return
                    }
                    setStep((s) => s - 1)
                  }}>
                  {t('btns.back')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <LoadingButton
                  fullWidth
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  color="info"
                  size="large">
                  {isSubmitting ? 'Потвърждение' : isLastStep() ? t('btns.end') : t('btns.next')}
                </LoadingButton>
              </Grid>
            </Grid>
          )}
        </Form>
      )}
    </Formik>
  )
}
