import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import { Container, Stepper, Step, StepLabel, StepConnector, Button } from '@material-ui/core'
import { FormikErrors } from 'formik'

import useForm from 'common/form/useForm'
import { validationSchema } from './helpers/validation-schema'
import { Steps, Step as StepType } from './helpers/support-form.models'
import Layout from 'components/layout/Layout'
import StepIcon from './StepperIcon'
import GeneralInfo from './steps/GeneralInfo'
import AdditionalQuestions from './steps/AdditionalQuestions'
import ThankYou from './steps/ThankYou'
import GDPR from './steps/GDRP'
import Roles from './steps/Roles'

import { SupportFormData } from './helpers/support-form.models'

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    stepper: {
      backgroundColor: 'transparent',
    },
  }),
)

const defaults: SupportFormData = {
  terms: false,
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
              .map(([key, _]) => key)
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
            if (errors.info) {
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

  const onSubmit = () => {
    formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
      const hasErrors = !!Object.keys(errors).length
      if (hasErrors) {
        stepFailed(Steps.GDPR)
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
    { label: t('common:support-form.steps.role.title'), component: <Roles formik={formik} /> },
    {
      label: t('common:support-form.steps.addition-questions.title'),
      component: <AdditionalQuestions formik={formik} failedStep={failedStep} />,
    },
    {
      label: t('common:support-form.steps.info.title'),
      component: <GeneralInfo formik={formik} />,
    },
    { label: t('common:support-form.steps.gdpr.title'), component: <GDPR formik={formik} /> },
    {
      label: t('common:support-form.steps.thank-you.title'),
      component: <ThankYou setActiveStep={setActiveStep} />,
    },
  ]

  const getStepContent = (step: number) => {
    return steps[step].component || 'Unknown step'
  }

  return (
    <Layout title={t('common:support-form.title')}>
      <Container maxWidth="lg">
        <Stepper
          className={classes.stepper}
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}>
          {steps.map((step, index) => {
            const labelProps: { optional?: React.ReactNode; error?: boolean } = {}

            if (isStepFailed(index)) {
              labelProps.error = true
            }
            return (
              <Step key={step.label}>
                <StepLabel {...labelProps} StepIconComponent={StepIcon}>
                  {step.label}
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {isThankYouStep(activeStep, steps) ? (
          steps[steps.length - 1].component
        ) : (
          <>
            <div className={classes.instructions}>{getStepContent(activeStep)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                {t('common:support-form.cta.back')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isLastStep(activeStep, steps) ? onSubmit : handleNext.bind(this, activeStep)
                }
                className={classes.button}>
                {isLastStep(activeStep, steps)
                  ? t('common:support-form.cta.submit')
                  : t('common:support-form.cta.next')}
              </Button>
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}
