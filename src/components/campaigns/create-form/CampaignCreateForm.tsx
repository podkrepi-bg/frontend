import Link from 'next/link'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import React, { useState, useRef } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers, FormikProps } from 'formik'

import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import createStyles from '@mui/styles/createStyles'
import { Stepper, Step, StepLabel, StepConnector, Hidden, Grid, Typography } from '@mui/material'

import { ApiErrors } from 'service/apiErrors'
import { useCreateCampaign } from 'service/campaign'

import { AlertStore } from 'stores/AlertStore'

import { routes } from 'common/routes'
import GenericForm from 'components/common/form/GenericForm'

import Actions from './Actions'
import StepIcon from './StepperIcon'
import stepsHandler from './StepsHandler'
import {
  Steps,
  Step as StepType,
  CampaignFormData,
  CampaignDateTypes,
  BeneficiaryTypes,
  OrganizerBeneficiaryRelation,
} from './helpers/campaign-form.types'
import { validationSchema } from './helpers/validation-schema'

import CoordinatorInfo from './steps/BeneficiaryInfo'
import CampaignDetails from './steps/CampaignDetails'
import CampaignGeneralInfo from './steps/CampaignGeneralInfo'
import theme from 'common/theme'
import Organizer from './steps/Organizer'
import { useCurrentPerson } from 'common/util/useCurrentPerson'
import BeneficiaryType from './steps/BeneficiaryType'
import BeneficiaryInfo from './steps/BeneficiaryInfo'

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

const initialValues: CampaignFormData = {
  organizer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  beneficiaryType: BeneficiaryTypes.Person,
  organizerBeneficiaryRelation: OrganizerBeneficiaryRelation.Related,
  beneficiaryPerson: {
    firstName: '',
    midName: '',
    lastName: '',
    email: '',
    phone: '',
    personalNumber: '',
  },
  beneficiaryCompany: {
    companyName: '',
    companyNumber: '',
    address: '',
    email: '',
    phone: '',
    legalPersonFirstName: '',
    legalPersonMidName: '',
    legalPersonLastName: '',
  },
  campaignInfo: {
    campaignTypeId: '',
    campaignTypeName: '',
    targetAmount: 0,
    campaignDate: CampaignDateTypes.AmountReached,
    endDate: '',
  },
  campaignDetails: {
    description: '',
    soFar: '',
    aim: '',
    homepageLink: '',
    mediaLink: '',
    facebook: '',
    otherLinks: '',
  },
}

const steps: StepType[] = [
  {
    component: <BeneficiaryType />,
  },
  {
    component: <Organizer />,
  },
  {
    component: <BeneficiaryInfo />,
  },
  {
    component: <CampaignGeneralInfo />,
  },
  {
    component: <CampaignDetails />,
  },
]

export default function CampaignCreateForm() {
  const { t } = useTranslation()
  const classes = useStyles()
  const formRef = useRef<FormikProps<CampaignFormData>>(null)
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)
  const [failedStep, setFailedStep] = useState<Steps>(Steps.NONE)

  const { data: person } = useCurrentPerson()

  initialValues.organizer = {
    firstName: person?.user.firstName,
    lastName: person?.user.lastName,
    email: person?.user.email,
    phone: person?.user.phone,
  }

  // const mutation = useMutation<
  //   AxiosResponse<CampaignResponse>,
  //   AxiosError<ApiErrors>,
  //   CampaignInput
  // >({
  //   mutationFn: useCreateCampaign(),
  //   onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
  //   onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  // })

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = async (
    values: CampaignFormData,
    actions: FormikHelpers<CampaignFormData>,
  ) => {
    if (isLastStep(activeStep, steps)) {
      setActiveStep(4) // for test purposes
      return
    }

    actions.setTouched({})
    actions.setSubmitting(false)
    await stepsHandler({ initialValues, values, actions, activeStep, setActiveStep, setFailedStep })
  }

  const isStepFailed = (step: Steps | number): boolean => {
    return step === failedStep
  }

  const isLastStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 1
  }

  const isBeneficiaryTypeChoosingStep = (activeStep: number, steps: StepType[]): boolean => {
    return activeStep === steps.length - 5
  }

  return (
    <>
      <GenericForm<CampaignFormData>
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
        {isBeneficiaryTypeChoosingStep(activeStep, steps) ? (
          steps[activeStep].component
        ) : (
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
                  nextLabel={
                    isLastStep(activeStep, steps)
                      ? 'campaigns:steps.cta.submit'
                      : 'campaigns:steps.cta.next'
                  }
                />
              </Grid>
            </Grid>
          </div>
        )}
      </GenericForm>
      <Typography sx={{ marginTop: '100px', fontSize: '12px' }}>
        *Допълнителна информация за процеса на кандидатстване и неговите етапи можете да намерите в
        нашите{' '}
        <Link href={routes.privacyPolicy}>
          <a>Общи условия</a>
        </Link>{' '}
        и в секцията{' '}
        <Link href={routes.termsOfService}>
          <a>Често задавани въпроси</a>
        </Link>{' '}
      </Typography>
    </>
  )
}
