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

import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { createCampaignReport, uploadCampaignReportFiles } from 'service/campaignReport'

import theme from 'common/theme'

import { Person } from 'gql/person'
import { CampaignResponse } from 'gql/campaigns'

import {
  Steps,
  Step as StepType,
  CampaignReportFormData,
  ReportStatus,
  NotifierTypes,
  CampaignReportInput,
  CampaignReportResponse,
  ReportReason,
  CampaignReportUploadImage,
  UploadCampaignReportFiles,
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
import stepsHandler from './StepsHandler'
import GenericForm from 'components/common/form/GenericForm'

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
  person?: Person
}

export default function CampaignReportForm({ campaign, person }: Props) {
  const { t } = useTranslation('irregularity-report')
  const classes = useStyles()

  const formRef = useRef<FormikProps<CampaignReportFormData>>(null)

  const [fail, setFail] = useState(false)
  const [success, setSuccess] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [activeStep, setActiveStep] = useState<Steps>(Steps.GREETING)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  const steps: StepType[] = [
    {
      component: <Greeting />,
    },
    {
      component: <Contacts />,
    },
    {
      component: <Info files={files} setFiles={setFiles} />,
    },
  ]

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const mutation = useMutation<
    AxiosResponse<CampaignReportResponse>,
    AxiosError<ApiErrors>,
    CampaignReportInput
  >({
    mutationFn: createCampaignReport,
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignReportUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignReportFiles
  >({
    mutationFn: uploadCampaignReportFiles(),
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
        const response = await mutation.mutateAsync(data)
        await fileUploadMutation.mutateAsync({
          files,
          campaignReportId: response.data.id,
        })
        actions.resetForm()
        setSuccess(true)
      } catch (error) {
        console.error(error)
        setFail(true)
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
    initialValues.person.firstName = person?.firstName || ''
    initialValues.person.lastName = person?.lastName || ''
    initialValues.person.email = person?.email || ''
    initialValues.person.phone = person?.phone || ''

    await stepsHandler({ actions, activeStep, setActiveStep, setFailedStep })
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
      {activeStep === Steps.GREETING && <Remark text={t('steps.greeting.remark')} />}
      {activeStep === Steps.CONTACTS && <Remark text={t('steps.contacts.remark')} />}
    </>
  )
}
