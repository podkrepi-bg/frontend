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
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
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

const validationSchema: yup.SchemaOf<SupportFormData> = yup.object().shape({
  terms: yup
    .bool()
    .required()
    .test('terms', 'Please check one checkbox', (value) => {
      if (value) {
        return true
      }
      return new yup.ValidationError('Please check one checkbox', null, 'terms')
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
    .test('isTruthy', 'Not include truthy value', function (this: any, value: any) {
      const { path, createError } = this
      if (!Object.values(value).filter((value) => value).length) {
        return createError({ path, message: 'Not include truthy value' })
      }
      return true
    }),
  benefactor: yup
    .object()
    .shape({
      campaignBenefactor: yup.bool(),
      platformBenefactor: yup.bool(),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, value: any) {
      const { path, createError } = this
      if (!Object.values(value).filter((value) => value).length) {
        return createError({ path, message: 'Not include truthy value' })
      }
      return true
    }),
  associationMember: yup
    .object()
    .shape({
      isMember: yup.bool(),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, value: any) {
      const { path, createError } = this
      console.log('Validating: ' + Object.values(value))
      if (!Object.values(value).filter((value) => value).length) {
        return createError({ path, message: 'Not include truthy value' })
      }
      return true
    }),
  partner: yup
    .object()
    .shape({
      npo: yup.bool(),
      bussiness: yup.bool(),
      other: yup.bool(),
      otherText: yup.string(),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, values: any) {
      const { path, createError } = this
      console.log('Validating: ' + Object.values(values))
      const objValues = Object.values(values)
      const selectedCount = objValues.filter((value) => value).length
      const [npo, bussiness, otherCheckbox, otherCheckboxText] = objValues
      if (!selectedCount) {
        return createError({ path, message: 'required' })
      }
      if (selectedCount && otherCheckbox && !otherCheckboxText) {
        return createError({ path, message: 'Other text is required' })
      }

      if (!npo && !bussiness && !otherCheckbox && otherCheckboxText) {
        return createError({ path, message: 'Other checkbox is required' })
      }
      return true
    }),
  volunteer: yup
    .object()
    .shape({
      areas: yup.array().of(yup.string()),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, values: any) {
      const { path, createError } = this
      if (!values.areas || !values.areas.length) {
        return createError({ path, message: 'Not include truthy value' })
      }
      return true
    }),
  promoter: yup
    .object()
    .shape({
      mediaPartner: yup.bool(),
      ambassador: yup.bool(),
      other: yup.bool(),
      otherText: yup.string(),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, values: any) {
      const { path, createError } = this
      console.log('Validating: ' + Object.values(values))
      const objValues = Object.values(values)
      const selectedCount = objValues.filter((value) => value).length
      const [mediaPartner, ambassador, otherCheckbox, otherCheckboxText] = objValues
      if (!selectedCount) {
        return createError({ path, message: 'required' })
      }
      if (selectedCount && otherCheckbox && !otherCheckboxText) {
        return createError({ path, message: 'Other text is required' })
      }

      if (!mediaPartner && !ambassador && selectedCount && !otherCheckbox && otherCheckboxText) {
        return createError({ path, message: 'Other checkbox is required' })
      }
      return true
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

export default function Steppers() {
  const { t } = useTranslation()
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [failedStep, setFailedStep] = useState(-1)

  const handleNext = () => {
    if (activeStep === 0) {
      formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
        if (errors.roles) {
          stepFailed(0)
          return
        }
        stepFailed(-1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      })
    }
    if (activeStep === 1) {
      formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
        console.log(errors)
        if (
          (errors.benefactor && formik.values.roles.benefactor) ||
          (errors.associationMember && formik.values.roles.associationMember) ||
          (errors.partner && formik.values.roles.partner) ||
          (errors.promoter && formik.values.roles.promoter) ||
          (errors.volunteer && formik.values.roles.volunteer)
        ) {
          stepFailed(1)
          return
        }
        stepFailed(-1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      })
    }

    if (activeStep === 2) {
      formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
        if (errors.info) {
          stepFailed(2)
          return
        }
        stepFailed(-1)
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      })
    }

    if (activeStep === 3) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
    if (activeStep === 4) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const stepFailed = (index: number) => {
    setFailedStep(index)
  }

  const isStepFailed = (step: number) => {
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
      if (errors.terms) {
        stepFailed(3)
        return
      }
      console.log(formik.values)
      console.log(formik.isValid)
      handleNext()
      stepFailed(-1)
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
                onClick={isLastStep(activeStep, steps) ? onSubmit : handleNext}
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
