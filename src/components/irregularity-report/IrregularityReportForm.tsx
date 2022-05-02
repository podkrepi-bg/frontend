// import { useMutation } from 'react-query'
// import { AxiosError, AxiosResponse } from 'axios'
// import { ApiErrors } from 'service/apiErrors'
// import { AlertStore } from 'stores/AlertStore'
// import { routes } from 'common/routes'
import { useTranslation } from 'next-i18next'
import React, { useState, useRef } from 'react'
import { FormikHelpers, FormikProps } from 'formik'

import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import createStyles from '@mui/styles/createStyles'
import { Stepper, Step, StepLabel, StepConnector, Grid } from '@mui/material'

import GenericForm from 'components/common/form/GenericForm'

import Actions from './Actions'
import StepIcon from './StepperIcon'
import stepsHandler from './StepsHandler'
import { Steps, Step as StepType, ReportFormData, DonorTypes } from './helpers/report.types'
import { validationSchema } from './helpers/validation-schema'

import Greeting from './steps/Greeting'
import Contacts from './steps/Contacts'
import Info from './steps/Info'
import theme from 'common/theme'
import { CampaignResponse } from 'gql/campaigns'
import Remark from './helpers/Remark'
import { useSession } from 'common/util/useSession'

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 21,
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.info.light,
    borderRadius: 1,
  },
})(StepConnector)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(5),
    },
    stepper: {
      backgroundColor: 'transparent',
      marginTop: theme.spacing(10),
      marginBottom: theme.spacing(8),
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    content: {
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

const initialValues: ReportFormData = {
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  info: {
    campaignId: '',
    description: '',
    donorType: DonorTypes.No,
  },
}

const steps: StepType[] = [
  {
    component: <Greeting />,
  },
  {
    component: <Contacts />,
  },
  {
    component: <Info />,
  },
]

type Props = {
  campaign: CampaignResponse
}

export default function IrregularityReportForm({ campaign }: Props) {
  const { t } = useTranslation('irregularity-report')
  const classes = useStyles()
  const formRef = useRef<FormikProps<ReportFormData>>(null)
  const [activeStep, setActiveStep] = useState<Steps>(Steps.GREETING)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  const { session } = useSession()

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (values: ReportFormData, actions: FormikHelpers<ReportFormData>) => {
    if (isLastStep(activeStep, steps)) {
      setActiveStep(2) // for test purposes
      return
    }

    actions.setTouched({})
    actions.setSubmitting(false)

    initialValues.info.campaignId = campaign.id
    initialValues.person.firstName = session?.given_name || ''
    initialValues.person.lastName = session?.family_name || ''
    initialValues.person.email = session?.email || ''

    await stepsHandler({ initialValues, values, actions, activeStep, setActiveStep, setFailedStep })
  }

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 1
  }

  const isFirstStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 3
  }

  return (
    <>
      <GenericForm<ReportFormData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema[activeStep]}
        innerRef={formRef}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          className={classes.stepper}
          connector={<ColorlibConnector />}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepLabel error={isStepFailed(index)} StepIconComponent={StepIcon} />
            </Step>
          ))}
        </Stepper>
        <div className={classes.content}>
          <Grid container justifyContent="center">
            <Grid item xs={12} className={classes.instructions}>
              {steps[activeStep].component}
            </Grid>
            <Grid item xs={12}>
              <Actions
                activeStep={activeStep}
                disableBack={activeStep === 0}
                onBack={handleBack}
                // loading={mutation.isLoading}
                campaign={campaign}
                nextLabel={isLastStep(activeStep, steps) ? 'cta.submit' : 'cta.next'}
                backLabel={isFirstStep(activeStep, steps) ? 'cta.back-to-campaign' : 'cta.back'}
              />
            </Grid>
          </Grid>
        </div>
      </GenericForm>
      {activeStep === 0 && <Remark text={t('steps.greeting.remark')} />}
      {activeStep === 1 && <Remark text={t('steps.contacts.remark')} />}
    </>
  )
}
