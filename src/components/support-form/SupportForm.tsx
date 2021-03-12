import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import { Stepper, Step, StepLabel, StepConnector, Hidden, Grid } from '@material-ui/core'

import GenericForm from 'components/common/form/GenericForm'

import Actions from './Actions'
import Roles from './steps/Roles'
import StepIcon from './StepperIcon'
import ThankYou from './steps/ThankYou'
import Newsletter from './steps/Newsletter'
import GeneralInfo from './steps/GeneralInfo'
import AdditionalQuestions from './steps/AdditionalQuestions'
import { validationSchema } from './helpers/validation-schema'
import { SupportFormData } from './helpers/support-form.types'
import { Steps, Step as StepType } from './helpers/support-form.types'

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

const initialValues: SupportFormData = {
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
    backend: false,
    frontend: false,
    marketing: false,
    qa: false,
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

const steps: StepType[] = [
  {
    label: 'common:support-form.steps.role.title',
    component: <Roles />,
  },
  {
    label: 'common:support-form.steps.addition-questions.title',
    component: <AdditionalQuestions />,
  },
  {
    label: 'common:support-form.steps.info.title',
    component: <GeneralInfo />,
  },
  {
    label: 'common:support-form.steps.newsletter.title',
    component: <Newsletter />,
  },
  {
    label: 'common:support-form.steps.thank-you.title',
    component: <ThankYou />,
  },
]

export default function SupportForm() {
  const { t } = useTranslation()
  const classes = useStyles()
  const [maxStep, setMaxStep] = useState<Steps>(Steps.ROLES)
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ROLES)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  useEffect(() => {
    setMaxStep((prev) => {
      if (activeStep > prev) {
        return activeStep
      }
      return prev
    })
  }, [activeStep])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
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
    if (isThankYouStep(activeStep, steps)) {
      return undefined
    }
    if (step <= maxStep) {
      return () => setActiveStep(step)
    }
  }

  return (
    <GenericForm<SupportFormData>
      onSubmit={async (values, actions) => {
        if (isLastStep(activeStep, steps)) {
          const errors = await actions.validateForm()
          const hasErrors = !!Object.keys(errors).length
          if (hasErrors) {
            setFailedStep(Steps.NEWSLETTER)
            return
          }
          setActiveStep((prevActiveStep) => prevActiveStep + 1)
          setFailedStep(Steps.NONE)
        } else {
          actions.setTouched({})
          actions.setSubmitting(false)
          switch (activeStep) {
            case Steps.ROLES:
              {
                const errors = await actions.validateForm()
                if (errors.roles) {
                  setFailedStep(Steps.ROLES)
                  return
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                setFailedStep(Steps.NONE)
              }
              break
            case Steps.QUESTIONS:
              {
                const errors = await actions.validateForm()
                let hasErrors = false
                const questions = Object.entries(values.roles)
                  .filter(([, value]) => value)
                  .map(([key]) => key)

                Object.keys(errors).forEach((error) => {
                  if (questions.includes(error)) {
                    hasErrors = true
                  }
                })

                if (hasErrors) {
                  setFailedStep(Steps.QUESTIONS)
                  return
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                setFailedStep(Steps.NONE)
              }
              break
            case Steps.INFO:
              {
                const errors = await actions.validateForm()
                if (errors.info || errors.terms) {
                  setFailedStep(Steps.INFO)
                  return
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
                setFailedStep(Steps.NONE)
              }
              break
            default:
              return 'Unknown step'
          }
        }
      }}
      initialValues={initialValues}
      validationSchema={validationSchema[activeStep]}>
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
                {t(step.label)}
              </StyledStepLabel>
            </Step>
          ))}
        </Stepper>
      </Hidden>
      {isThankYouStep(activeStep, steps) ? (
        steps[activeStep].component
      ) : (
        <div className={classes.content}>
          <Grid container justify="center">
            <Grid item xs={12} className={classes.instructions}>
              {steps[activeStep].component}
            </Grid>
            <Grid item xs={12}>
              <Actions
                disableBack={activeStep === 0}
                onBack={handleBack}
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
    </GenericForm>
  )
}
