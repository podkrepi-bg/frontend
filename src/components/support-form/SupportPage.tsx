import { FormikErrors } from 'formik'
import { useTranslation } from 'react-i18next'
import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import { Container, Stepper, Step, StepLabel, StepConnector, Hidden, Grid } from '@material-ui/core'

import useForm from 'common/form/useForm'
import Layout from 'components/layout/Layout'

import Newsletter from './steps/Newsletter'
import Roles from './steps/Roles'
import StepIcon from './StepperIcon'
import ThankYou from './steps/ThankYou'
import GeneralInfo from './steps/GeneralInfo'
import AdditionalQuestions from './steps/AdditionalQuestions'
import { validationSchema } from './helpers/validation-schema'
import { SupportFormData } from './helpers/support-form.models'
import { Steps, Step as StepType } from './helpers/support-form.models'
import Actions from './Actions'

const ColorlibConnector = withStyles({
  alternativeLabel: { top: 22 },
  active: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg, #4AC3FF 0%, #29a2df 50%, #1b88be 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage: 'linear-gradient( 95deg, #4AC3FF 0%, #29a2df 50%, #1b88be 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector)

const StyledStepLabel = withStyles({
  label: { cursor: 'pointer' },
  iconContainer: { cursor: 'pointer' },
})(StepLabel)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { width: '100%' },
    instructions: { marginTop: theme.spacing(1), marginBottom: theme.spacing(5) },
    stepper: { backgroundColor: 'transparent' },
    content: { display: 'flex', justifyContent: 'center' },
  }),
)

const defaults: SupportFormData = {
  terms: false,
  newsletter: false,
  info: {
    email: '',
    name: '',
    phone: '',
    address: '',
  },
  roles: {
    benefactor: false,
    partner: false,
    associationMember: false,
    promoter: false,
    volunteer: false,
  },
  benefactor: {
    campaignBenefactor: false,
    platformBenefactor: false,
  },
  partner: {
    npo: false,
    bussiness: false,
    other: false,
    otherText: '',
  },
  volunteer: {
    areas: [],
  },
  associationMember: {
    isMember: true,
  },
  promoter: {
    mediaPartner: false,
    ambassador: false,
    other: false,
    otherText: '',
  },
}

export default function SupportForm(this: any) {
  const { t } = useTranslation()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [failedStep, setFailedStep] = useState(Steps.NONE)
  const [maxStep, setMaxStep] = useState(0)

  useEffect(() => {
    setMaxStep((prev) => {
      if (activeStep > prev) {
        return activeStep
      }
      return prev
    })
  }, [activeStep])

  const handleNext = (step: Steps | number) => {
    switch (step) {
      case Steps.ROLES:
        {
          formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
            if (errors.roles) {
              stepFailed(Steps.ROLES)
              return
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            stepFailed(Steps.NONE)
          })
        }
        break
      case Steps.QUESTIONS:
        {
          formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
            let hasErrors = false
            const questions = Object.entries(formik.values.roles)
              .filter(([_, value]) => value)
              .map(([key]) => key)

            Object.keys(errors).forEach((error) => {
              if (questions.includes(error)) {
                hasErrors = true
              }
            })

            if (hasErrors) {
              stepFailed(Steps.QUESTIONS)
              return
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            stepFailed(Steps.NONE)
          })
        }
        break
      case Steps.INFO:
        {
          formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
            if (errors.info || errors.terms) {
              stepFailed(Steps.INFO)
              return
            }
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            stepFailed(Steps.NONE)
          })
        }
        break
      default:
        return 'Unknown step'
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const stepFailed = (step: Steps) => {
    setFailedStep(step)
  }

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 2
  }

  const isThankYouStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 1
  }

  const goToStep = (step: number) => {
    if (step <= maxStep) {
      return () => setActiveStep(step)
    }
  }

  const onSubmit = () => {
    formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
      const hasErrors = !!Object.keys(errors).length
      if (hasErrors) {
        stepFailed(Steps.NEWSLETTER)
        return
      }

      console.log(formik.values)
      console.log(formik.isValid)
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      stepFailed(Steps.NONE)
    })
  }

  const { formik } = useForm({ initialValues: defaults, onSubmit, validationSchema })

  const steps = [
    {
      label: t('common:support-form.steps.role.title'),
      component: <Roles formik={formik} />,
    },
    {
      label: t('common:support-form.steps.addition-questions.title'),
      component: <AdditionalQuestions formik={formik} />,
    },
    {
      label: t('common:support-form.steps.info.title'),
      component: <GeneralInfo formik={formik} />,
    },
    {
      label: t('common:support-form.steps.newsletter.title'),
      component: <Newsletter formik={formik} />,
    },
    {
      label: t('common:support-form.steps.thank-you.title'),
      component: <ThankYou />,
    },
  ]

  const getStepContent = (step: number) => {
    return steps[step].component || 'Unknown step'
  }

  return (
    <Layout title={t('common:support-form.title')}>
      <Container maxWidth="lg">
        <Hidden smDown>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            className={classes.stepper}
            connector={<ColorlibConnector />}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StyledStepLabel
                  onClick={goToStep(index)}
                  error={isStepFailed(index)}
                  StepIconComponent={StepIcon}>
                  {step.label}
                </StyledStepLabel>
              </Step>
            ))}
          </Stepper>
        </Hidden>
        {isThankYouStep(activeStep, steps) ? (
          steps[steps.length - 1].component
        ) : (
          <div className={classes.content}>
            <Grid container justify="center">
              <Grid item xs={12} className={classes.instructions}>
                {getStepContent(activeStep)}
              </Grid>
              <Grid item xs={12}>
                <Actions
                  disableBack={activeStep === 0}
                  onBack={handleBack}
                  onNext={
                    isLastStep(activeStep, steps) ? onSubmit : handleNext.bind(this, activeStep)
                  }
                  nextLabel={
                    isLastStep(activeStep, steps)
                      ? t('common:support-form.cta.submit')
                      : t('common:support-form.cta.next')
                  }
                />
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </Layout>
  )
}
