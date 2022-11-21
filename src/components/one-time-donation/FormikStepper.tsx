import React, { PropsWithChildren, useCallback, useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material'
import { StepsContext } from './helpers/stepperContext'
import { OneTimeDonation } from 'gql/donations'
import { useSession } from 'next-auth/react'

const PREFIX = 'FormikStepper'

const classes = {
  container: `${PREFIX}-container`,
  stepIcon: `${PREFIX}-stepIcon`,
}

const StyledStepper = styled('div')(() => ({
  [`& .${classes.stepIcon}`]: {
    transform: 'scale(1.15)',
  },
}))

export interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label?: string
}

export function FormikStep({ children }: FormikStepProps) {
  return <>{children}</>
}

export type GenericFormProps<T> = PropsWithChildren<FormikConfig<T>>

export function FormikStepper({ children, ...props }: GenericFormProps<OneTimeDonation>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[]
  const { step, setStep } = useContext(StepsContext)
  const router = useRouter()
  const mobile = useMediaQuery('(max-width:568px)')
  useEffect(() => {
    router.query.success === 'false' || router.query.success === 'true' ? setStep(3) : null
  }, [router.query.success])
  const currentChild = childrenArray[step]
  const { data: session } = useSession()

  function isLoginStep() {
    return step === childrenArray.length - 3
  }

  function isLastStep() {
    return step === childrenArray.length - 2
  }

  function isLogged() {
    if (!session?.accessToken) {
      return false
    }

    return true
  }
  const { t } = useTranslation('one-time-donation')
  const hideNextButton = useCallback(
    (isAnonymous: boolean) => {
      if (isLoginStep() && !isLogged() && !isAnonymous) {
        return true
      }
      return false
    },
    [step],
  )
  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          values.isAnonymous = isLogged() === false ? true : values.isAnonymous ?? !isLogged()
          await props.onSubmit(values, helpers)
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
      validateOnMount
      validateOnBlur>
      {({ isSubmitting, handleSubmit, isValid, values: { isAnonymous } }) => (
        <Form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '662px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          autoComplete="off">
          <StyledStepper>
            <Stepper activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={index}>
                  <StepLabel classes={{ alternativeLabel: classes.stepIcon }}>
                    {!mobile && child.props.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </StyledStepper>
          <Box marginY={2}>{currentChild}</Box>
          {/* Controls of the form */}
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
                    setStep((s) => s - 1)
                  }}>
                  {t('btns.back')}
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <LoadingButton
                  disabled={!isValid || isSubmitting || hideNextButton(isAnonymous)}
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
