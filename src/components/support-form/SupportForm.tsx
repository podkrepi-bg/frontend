import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import { Container, Stepper, Step, StepLabel, StepConnector, Button } from '@material-ui/core'
import { FormikErrors } from 'formik'
import * as yup from 'yup'

import useForm from 'common/form/useForm'
import Layout from 'components/layout/Layout'
import StepIcon from './StepperIcon'
import GeneralInfo from './steps/GeneralInfo'
import AdditionalQuestions from './steps/AdditionalQuestions'
import ThankYou from './steps/ThankYou'
import GDPR from './steps/GDRP'
import Roles from './steps/Roles'

import { SupportFormData } from './types/SuportFormData'

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

type Step = {
  label: string
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  ROLES = 0,
  QUESTIONS = 1,
  INFO = 2,
  GDPR = 3,
}
function checkboxChecked(this: any, value: { [key: string]: boolean }) {
  const { path, createError } = this
  if (!Object.values(value).filter((value) => value).length) {
    return createError({ path, message: 'Must have at least one checked box' })
  }
  return true
}

const validationSchema: yup.SchemaOf<SupportFormData> = yup.object().shape({
  terms: yup
    .bool()
    .required()
    .test('checkboxChecked', 'Please check one checkbox', (value) => {
      return value
        ? true
        : new yup.ValidationError('Please check one checkbox', null, 'checkboxChecked')
    }),
  info: yup
    .object()
    .shape({
      email: yup.string().email().required(),
      name: yup.string().required(),
      phone: yup.string().required(),
      address: yup.string().required(),
    })
    .required(),
  roles: yup
    .object()
    .shape({
      benefactor: yup.bool(),
      partner: yup.bool(),
      volunteer: yup.bool(),
      associationMember: yup.bool(),
      promoter: yup.bool(),
    })
    .required()
    .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  benefactor: yup.object().when('roles.benefactor', {
    is: true,
    then: yup
      .object()
      .shape({
        campaignBenefactor: yup.bool(),
        platformBenefactor: yup.bool(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  }),
  associationMember: yup.object().when('roles.associationMember', {
    is: true,
    then: yup
      .object()
      .shape({
        isMember: yup.bool(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked),
  }),
  partner: yup.object().when('roles.partner', {
    is: true,
    then: yup
      .object()
      .shape({
        npo: yup.bool(),
        bussiness: yup.bool(),
        other: yup.bool(),
        otherText: yup.string().when('partner.other', {
          is: true,
          then: yup.string(),
        }),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked)
      .test('CustomValidation', 'Custom validation', function (this: any, values: any) {
        const { path, createError } = this
        return values.other && !values.otherText
          ? createError({ path, message: 'field is required' })
          : true
      }),
  }),
  volunteer: yup.object().when('roles.volunteer', {
    is: true,
    then: yup.object().shape({
      areas: yup.array().of(yup.string()),
    }),
  }),
  promoter: yup.object().when('roles.promoter', {
    is: true,
    then: yup
      .object()
      .shape({
        mediaPartner: yup.bool(),
        ambassador: yup.bool(),
        other: yup.bool(),
        otherText: yup.string(),
      })
      .test('checkboxChecked', 'Must have at least one checked box', checkboxChecked)
      .test('CustomValidation', 'Custom validation', function (this: any, values: any) {
        const { path, createError } = this
        return values.other && !values.otherText
          ? createError({ path, message: 'field is required' })
          : true
      }),
  }),
})

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

export default function Steppers(this: any) {
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
            const questions = Object.entries(formik.values.roles)
              .filter(([_, value]) => value)
              .map(([key, _]) => key)
            Object.keys(errors).forEach((error) => {
              if (questions.includes(error)) {
                stepFailed(Steps.QUESTIONS)
                return
              }
            })
            setActiveStep((prevActiveStep) => prevActiveStep + 1)
            stepFailed(Steps.NONE)
          })
        }
        break
      case Steps.INFO:
        {
          formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
            if (errors.info) {
              stepFailed(Steps.ROLES)
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

  const isLastStep = (activeStep: number, steps: Step[]): boolean => {
    return activeStep === steps.length - 2
  }

  const isThankYouStep = (activeStep: number, steps: Step[]): boolean => {
    return activeStep === steps.length - 1
  }

  const onSubmit = () => {
    formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
      if (!formik.isValid) {
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
    { label: 'Роля', component: <Roles formik={formik} /> },
    {
      label: 'Допълнителни въпроси',
      component: <AdditionalQuestions formik={formik} failedStep={failedStep} />,
    },
    { label: 'Данни за контакти', component: <GeneralInfo formik={formik} /> },
    { label: 'GDPR', component: <GDPR formik={formik} /> },
    { label: 'Благодарим', component: <ThankYou setActiveStep={setActiveStep} /> },
  ]

  const getStepContent = (step: number) => {
    return steps[step].component || 'Unknown step'
  }

  return (
    <Layout title={'Подкрепи'}>
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
                Назад
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={
                  isLastStep(activeStep, steps) ? onSubmit : handleNext.bind(this, activeStep)
                }
                className={classes.button}>
                {isLastStep(activeStep, steps) ? 'Преключи' : 'Напред'}
              </Button>
            </div>
          </>
        )}
      </Container>
    </Layout>
  )
}
