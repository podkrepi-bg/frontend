import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import React, { useState, useRef } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers, FormikProps } from 'formik'

import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import createStyles from '@mui/styles/createStyles'
import { Stepper, Step, StepLabel, StepConnector, Grid } from '@mui/material'

import { useSession } from 'common/util/useSession'
import { createCampaignReport } from 'service/campaignReport'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'

import theme from 'common/theme'
import GenericForm from 'components/common/form/GenericForm'

import { CampaignResponse } from 'gql/campaigns'

import stepsHandler from './StepsHandler'
import {
  Steps,
  Step as StepType,
  CampaignReportFormData,
  ReportStatus,
  NotifierTypes,
  CampaignReportInput,
  CampaignReportResponse,
  ReportReason,
} from './helpers/report.types'
import { validationSchema } from './helpers/validation-schema'

import Actions from './Actions'
import Info from './steps/Info'
import Fail from './helpers/Fail'
import StepIcon from './StepperIcon'
import Remark from './helpers/Remark'
import Greeting from './steps/Greeting'
import Contacts from './steps/Contacts'
import Success from './helpers/Success'

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

const isFirstStep = (activeStep: number, steps: StepType[]): boolean => {
  return activeStep === steps.length - 3
}

const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
  return activeStep === steps.length - 1
}

const initialValues: CampaignReportFormData = {
  status: ReportStatus.INITIAL,
  person: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  info: {
    campaignId: '',
    reportContent: '',
    notifierType: NotifierTypes.OTHER,
    reason: ReportReason.NONE,
  },
}

type Props = {
  campaign: CampaignResponse
}

export default function CampaignReportForm({ campaign }: Props) {
  const { t } = useTranslation('irregularity-report')
  const classes = useStyles()
  const { session } = useSession()

  const formRef = useRef<FormikProps<CampaignReportFormData>>(null)

  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState<Steps>(Steps.GREETING)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  if (window) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const mutation = useMutation<
    AxiosResponse<CampaignReportResponse>,
    AxiosError<ApiErrors>,
    CampaignReportInput
  >({
    mutationFn: createCampaignReport,
    onError: () => {
      setFail(true)
    },
  })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (
    values: CampaignReportFormData,
    actions: FormikHelpers<CampaignReportFormData>,
  ) => {
    if (isLastStep(activeStep, steps)) {
      const errors = await actions.validateForm(values)
      const hasErrors = !!Object.keys(errors).length
      if (hasErrors) {
        setFailedStep(Steps.INFO)
        return
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
      setFailedStep(Steps.NONE)
      try {
        const data: CampaignReportInput = {
          campaignId: values.info.campaignId,
          reportContent: values.info.reportContent,
          notifierType: values.info.notifierType,
          reason: values.info.reason,
          status: values.status,
          person: {
            firstName: values.person.firstName,
            lastName: values.person.lastName,
            email: values.person.email,
            phone: values.person.phone,
          },
        }
        console.log('data', data)
        await mutation.mutateAsync(data)
        actions.resetForm()
        setSuccess(true)
      } catch (error) {
        console.error(error)
        if (isAxiosError(error)) {
          const { response } = error as AxiosError<ApiErrors>
          response?.data.message.map(({ property, constraints }) => {
            actions.setFieldError(property, t(matchValidator(constraints)))
          })
        }
      }

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

  if (success) {
    return <Success />
  }

  if (fail) {
    return <Fail setFail={setFail} setActiveStep={setActiveStep} />
  }

  return (
    <>
      <GenericForm<CampaignReportFormData>
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
          <Grid container spacing={5} justifyContent="center" className={classes.instructions}>
            <Grid container item xs={12}>
              {activeStep < steps.length && steps[activeStep].component}
            </Grid>
            <Grid container item spacing={3}>
              <Actions
                activeStep={activeStep}
                disableBack={activeStep === 0}
                onBack={handleBack}
                loading={mutation.isLoading}
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
