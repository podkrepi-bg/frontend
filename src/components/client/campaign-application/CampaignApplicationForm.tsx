import { Grid, StepLabel } from '@mui/material'
import { Person } from 'gql/person'
import { useCallback, useState } from 'react'

import {
  CampaignApplicationFormData,
  Step as StepType,
  Steps,
} from './helpers/campaignApplication.types'

import GenericForm from 'components/common/form/GenericForm'
import CampaignApplicationFormActions from './CampaignApplicationFormActions'
import CampaignApplicationRemark from './CampaignApplicationRemark'
import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplication from './steps/CampaignApplication'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'

import { validationSchema } from './helpers/validation-schema'

import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { FormikHelpers } from 'formik'
import {
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
  UploadCampaignApplicationFilesRequest,
  UploadCampaignApplicationFilesResponse,
} from 'gql/campaign-applications'
import { CampaignTypesResponse } from 'gql/campaign-types'
import { t } from 'i18next'
import { useTranslation } from 'next-i18next'
import { ApiErrors, matchValidator } from 'service/apiErrors'
import {
  useCreateCampaignApplication,
  useUploadCampaignApplicationFiles,
} from 'service/campaign-application'
import { useCampaignTypesList } from 'service/campaignTypes'
import { AlertStore } from 'stores/AlertStore'
import {
  StyledCampaignApplicationStep,
  StyledCampaignApplicationStepper,
  StyledStepConnector,
} from './helpers/campaignApplication.styled'

const steps: StepType[] = [
  {
    title: 'campaign-application:steps.organizer.title',
  },
  {
    title: 'campaign-application:steps.campaign-application.title',
  },
  {
    title: 'campaign-application:steps.campaign-application-details.title',
  },
]

type Props = {
  person?: Person
}

export default function CampaignApplicationForm({ person }: Props) {
  const { t } = useTranslation('campaign-application')
  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)
  const isLast = activeStep === Steps.CAMPAIGN_DETAILS
  const [submitting, setSubmitting] = useState(false)

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
      organizerBeneficiaryRelationship: '-',
      otherFinancialSources: '',
    },
  }

  const [files, setFiles] = useState<File[]>([])

  const { data } = useCampaignTypesList()
  const create = useCreateApplication()
  const handleSubmit = async (
    formData: CampaignApplicationFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignApplicationFormData>,
  ) => {
    if (isLast) {
      if (submitting) {
        return
      }
      setSubmitting(true)
      try {
        const createInput = mapCreateInput(formData, data ?? [])
        await create(createInput, files)

        resetForm()
        setSubmitting(false)
        AlertStore.show(t('alerts.successfully-created'), 'success')

        // take user to next campaign application page
      } catch (error) {
        setSubmitting(false)
        console.error(error)
        if (isAxiosError(error)) {
          const { response } = error as AxiosError<ApiErrors>
          response?.data.message.map(({ property, constraints }) => {
            setFieldError(property, t(matchValidator(constraints)))
          })
        }
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
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
            {activeStep === Steps.ORGANIZER && <CampaignApplicationOrganizer />}
            {activeStep === Steps.CAMPAIGN && <CampaignApplication />}
            {activeStep === Steps.CAMPAIGN_DETAILS && (
              <CampaignApplicationDetails files={files} setFiles={setFiles} />
            )}
          </Grid>
          <Grid container item alignContent="center">
            <CampaignApplicationFormActions
              activeStep={activeStep}
              onBack={handleBack}
              isLast={isLast}
              submitting={submitting}
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
  const create = useMutation<
    AxiosResponse<CreateCampaignApplicationResponse>,
    AxiosError<ApiErrors>,
    CreateCampaignApplicationInput
  >({
    mutationFn: useCreateCampaignApplication(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const fileUpload = useMutation<
    AxiosResponse<UploadCampaignApplicationFilesResponse>,
    AxiosError<ApiErrors>,
    UploadCampaignApplicationFilesRequest
  >({
    mutationFn: useUploadCampaignApplicationFiles(),
  })

  return async (i: CreateCampaignApplicationInput, files: File[]) => {
    const {
      data: { id },
    } = await create.mutateAsync(i)

    await fileUpload.mutateAsync({ campaignApplicationId: id, files })

    return { id }
  }
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
