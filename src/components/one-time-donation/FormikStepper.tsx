import React, { PropsWithChildren, useContext, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Grid, Step, StepLabel, Stepper } from '@mui/material'
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
  useEffect(() => {
    router.query.success === 'false' || router.query.success === 'true' ? setStep(3) : null
  }, [router.query.success])
  const currentChild = childrenArray[step]
  const { data: session } = useSession()
  function isLastStep() {
    return step === childrenArray.length - 2
  }

  function isFirstStep() {
    return step === 0
  }

  function isLogged() {
    if (!session?.accessToken) {
      return false
    }

    return true
  }
  const { t } = useTranslation('one-time-donation')

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers)
        } else if (isFirstStep() && isLogged()) {
          if (values.payment === 'bank') {
            router.push({
              pathname: router.route,
              query: {
                slug: router.query.slug,
                success: true,
              },
            })
          } else {
            !isLogged ? setStep((s) => s + 1) : setStep((s) => s + 2)
          }
        } else {
          setStep((s) => s + 1)
          helpers.setTouched({})
        }
      }}
      validateOnMount
      validateOnBlur>
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '662px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          autoComplete="off">
          <StyledStepper>
            <Stepper alternativeLabel activeStep={step}>
              {childrenArray.map((child, index) => (
                <Step key={index}>
                  <StepLabel classes={{ alternativeLabel: classes.stepIcon }}>
                    {child.props.label}
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
                  disabled={!isValid}
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
