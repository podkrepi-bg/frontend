import React, { useState } from 'react'

import { makeStyles, Theme, createStyles, withStyles } from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import Button from '@material-ui/core/Button'
import StepIcon from './StepperIcon'
import GeneralInfo from './GeneralInfo'
import AdditionalQuestions from './AdditionalQuestions'
import ThankYou from './ThankYou'
import useForm from 'common/form/useForm'
import * as yup from 'yup'
import Roles from './Roles'
import { FormikErrors } from 'formik'
import Layout from 'components/layout/Layout'
import { useTranslation } from 'react-i18next'
import { Checkbox, Container, FormControlLabel } from '@material-ui/core'

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
  }),
)

export type SupportFormData = {
  policy: boolean
  info: {
    email: string
    name: string
    phone: string
    address: string
  }
  roles: {
    donate: boolean
    partner: boolean
    media: boolean
    other: boolean
  }
}

const validationSchema: yup.SchemaOf<SupportFormData> = yup.object().shape({
  policy: yup.bool().required(),
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
      donate: yup.bool(),
      partner: yup.bool(),
      media: yup.bool(),
      other: yup.bool(),
    })
    .required()
    .test('isTruthy', 'Not include truthy value', function (this: any, value: any) {
      const { path, createError } = this
      if (!Object.values(value).filter((value) => value).length) {
        return createError({ path, message: 'Not include truthy value' })
      }
      return true
    }),
  // questions: yup
  //   .object()
  //   .when('donate', {
  //     is: true,
  //     then: yup.object().shape({
  //       quest1: yup.string(),
  //       quest2: yup.string(),
  //       quest3: yup.string(),
  //     }),
  //   })
  //   .required()
  //   .when('partner', {
  //     is: true,
  //     then: yup.object().shape({
  //       quest21: yup.string(),
  //       quest22: yup.string(),
  //       quest23: yup.string(),
  //     }),
  //   })
  //   .required()
  //   .when('media', {
  //     is: true,
  //     then: yup.object().shape({
  //       quest31: yup.string(),
  //       quest32: yup.string(),
  //       quest33: yup.string(),
  //     }),
  //   })
  //   .required(),
})

const defaults: SupportFormData = {
  policy: false,
  info: {
    email: '',
    name: '',
    phone: '',
    address: '',
  },
  roles: {
    donate: false,
    partner: false,
    media: false,
    other: false,
  },
}

export default function Steppers() {
  const { t } = useTranslation()
  const classes = useStyles()
  const [activeStep, setActiveStep] = React.useState(0)
  const steps = ['Роля', 'Допълнителни въпроси', 'Данни за контакти', 'GDPR', 'Благодарим']

  const handleNext = () => {
    if (activeStep === 0) {
      formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
        if (errors.roles) {
          return
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
      })
    }
    if (activeStep === 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    if (activeStep === 2) {
      formik.validateForm().then((errors: FormikErrors<SupportFormData>) => {
        if (errors.info) {
          return
        }
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

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <Roles formik={formik} />
      case 1:
        return <AdditionalQuestions formik={formik} />
      case 2:
        return <GeneralInfo formik={formik} />
      case 3:
        return (
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.policy}
                onChange={formik.handleChange}
                name="policy"
              />
            }
            label="Съгласен съм"
          />
        )
      default:
        return 'Unknown step'
    }
  }

  const isStepFailed = (step: number) => {
    return step === 1
  }

  const onSubmit = () => {
    console.log(formik.values)
    console.log(formik.isValid)
    handleNext()
  }

  const { formik } = useForm({ initialValues: defaults, onSubmit, validationSchema })

  return (
    <Layout title={'Поткрепи'}>
      <Container maxWidth="lg">
        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: { optional?: React.ReactNode; error?: boolean } = {}

            if (isStepFailed(index)) {
              labelProps.error = true
            }
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <ThankYou setActiveStep={setActiveStep} />
          ) : (
            <div>
              <div className={classes.instructions}>{getStepContent(activeStep)}</div>
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={activeStep === steps.length - 1 ? onSubmit : handleNext}
                  className={classes.button}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  )
}
