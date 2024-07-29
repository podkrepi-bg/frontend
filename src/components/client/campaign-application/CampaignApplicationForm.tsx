import { useCallback, useState } from 'react'
import { Grid, StepLabel } from '@mui/material'
import { Person } from 'gql/person'

import {
  CampaignApplicationFormData,
  Step as StepType,
  Steps,
} from './helpers/campaignApplication.types'

import GenericForm from 'components/common/form/GenericForm'
import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplication from './steps/CampaignApplication'
import CampaignApplicationFormActions from './CampaignApplicationFormActions'
import CampaignApplicationRemark from './CampaignApplicationRemark'
import stepsHandler from './helpers/stepsHandler'

import { validationSchema } from './helpers/validation-schema'

import {
  StyledCampaignApplicationStep,
  StyledCampaignApplicationStepper,
  StyledStepConnector,
} from './helpers/campaignApplication.styled'
import { useMutation } from '@tanstack/react-query'
import {
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
} from 'gql/campaign-applications'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { ApiErrors, matchValidator } from 'service/apiErrors'
import { useCreateCampaignApplication } from 'service/campaign-application'
import { AlertStore } from 'stores/AlertStore'
import { t } from 'i18next'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { FormikHelpers } from 'formik'
import { useCampaignTypesList } from 'service/campaignTypes'
import { CampaignTypesResponse } from 'gql/campaign-types'

const steps: StepType[] = [
  {
    title: 'campaign-application:steps.organizer.title',
    component: <CampaignApplicationOrganizer />,
  },
  {
    title: 'campaign-application:steps.campaign-application.title',
    component: <CampaignApplication />,
  },
  {
    title: 'campaign-application:steps.campaign-application-details.title',
    component: <CampaignApplicationDetails />,
  },
]

type Props = {
  person?: Person
}

export default function CampaignApplicationForm({ person }: Props) {
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)
  const isLast = activeStep === Steps.CAMPAIGN_DETAILS

  const initialValues: CampaignApplicationFormData = {
    organizer: {
      name: `${person?.firstName} ${person?.lastName}` ?? '',
      phone: person?.phone ?? '',
      email: person?.email ?? '',
      acceptTermsAndConditions: false,
      transparencyTermsAccepted: false,
      personalInformationProcessingAccepted: false,
    },
    application: {
      title: '',
      beneficiaryNames: '',
      campaignType: '',
      funds: 0,
      campaignEnd: '',
    },
    details: {
      campaignGuarantee: '',
      cause: '',
      currentStatus: '',
      description: '',
      documents: [],
      links: [],
      organizerBeneficiaryRelationship: '',
      otherFinancialSources: '',
    },
  }

  const { data } = useCampaignTypesList()
  const { mutation } = useCreateApplication()
  const handleSubmit = async (
    formData: CampaignApplicationFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignApplicationFormData>,
  ) => {
    if (isLast) {
      try {
        await mutation.mutateAsync(mapCreateInput(formData, data ?? []))

        resetForm()
      } catch (error) {
        console.error(error)
        if (isAxiosError(error)) {
          const { response } = error as AxiosError<ApiErrors>
          response?.data.message.map(({ property, constraints }) => {
            setFieldError(property, t(matchValidator(constraints)))
          })
        }
      }
    } else {
      stepsHandler({ activeStep, setActiveStep })
    }
  }

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [])

  return (
    <>
      <GenericForm<CampaignApplicationFormData>
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema[activeStep]}>
        <StyledCampaignApplicationStepper
          activeStep={activeStep}
          connector={<StyledStepConnector />}>
          {steps.map((step) => (
            <StyledCampaignApplicationStep key={step.title}>
              <StepLabel StepIconComponent={CampaignApplicationStepperIcon} />
            </StyledCampaignApplicationStep>
          ))}
        </StyledCampaignApplicationStepper>
        <Grid container>
          <Grid container item xs={12}>
            {activeStep < steps.length && steps[activeStep].component}
          </Grid>
          <Grid container item alignContent="center">
            <CampaignApplicationFormActions
              activeStep={activeStep}
              onBack={handleBack}
              isLast={isLast}
            />
          </Grid>
        </Grid>
      </GenericForm>
      {(activeStep === Steps.ORGANIZER || activeStep === Steps.CAMPAIGN) && (
        <CampaignApplicationRemark />
      )}
    </>
  )
}

const useCreateApplication = () => {
  const mutation = useMutation<
    AxiosResponse<CreateCampaignApplicationResponse>,
    AxiosError<ApiErrors>,
    CreateCampaignApplicationInput
  >({
    mutationFn: useCreateCampaignApplication(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  // const fileUploadMutation = useMutation<
  //   AxiosResponse<CampaignUploadImage[]>,
  //   AxiosError<ApiErrors>,
  //   UploadCampaignFiles
  // >({
  //   mutationFn: useUploadCampaignFiles(),
  // })

  return { mutation }
}

function mapCreateInput(
  i: CampaignApplicationFormData,
  types: CampaignTypesResponse[],
): CreateCampaignApplicationInput {
  return {
    acceptTermsAndConditions: i.organizer.acceptTermsAndConditions,
    personalInformationProcessingAccepted: i.organizer.personalInformationProcessingAccepted,
    transparencyTermsAccepted: i.organizer.transparencyTermsAccepted,

    organizerName: i.organizer.name,
    organizerEmail: i.organizer.email,
    organizerPhone: i.organizer.phone,

    beneficiary: i.application.beneficiaryNames,

    campaignName: i.application.title,
    amount: i.application.funds?.toString() ?? '',
    goal: i.details.cause,
    category: types.find((c) => c.id === i.application.campaignType)?.category,
    description: i.details.description,
    organizerBeneficiaryRel: i.details.organizerBeneficiaryRelationship ?? '-',
    campaignGuarantee: i.details.campaignGuarantee,
    history: i.details.currentStatus,
    otherFinanceSources: i.details.otherFinancialSources,
  }
}
