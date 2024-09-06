import { Grid, StepLabel, Typography } from '@mui/material'
import { Person } from 'gql/person'
import { useCallback, useEffect, useState } from 'react'

import {
  CampaignApplicationFormData,
  CampaignEndTypes,
  Step as StepType,
  Steps,
} from './helpers/campaignApplication.types'

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import GenericForm from 'components/common/form/GenericForm'
import CampaignApplicationRemark from './CampaignApplicationRemark'
import CampaignApplicationStepperIcon from './CampaignApplicationStepperIcon'
import CampaignApplicationBasic from './steps/CampaignApplicationBasic'
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
import { useTranslation } from 'next-i18next'
import { ApiErrors } from 'service/apiErrors'
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
import {
  ActionButton,
  ActionLinkButton,
  ActionSubmitButton,
  Root,
} from './helpers/campaignApplicationFormActions.styled'
import CampaignApplicationSummary from './steps/CampaignApplicationSummary'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

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

  const initialValues: CampaignApplicationFormData = {
    organizer: {
      name: `${person?.firstName} ${person?.lastName}` ?? '',
      phone: person?.phone ?? '',
      email: person?.email ?? '',
      acceptTermsAndConditions: false,
      transparencyTermsAccepted: false,
      personalInformationProcessingAccepted: false,
    },
    applicationBasic: {
      title: '',
      beneficiaryNames: '',
      campaignType: '',
      funds: 0,
      campaignEnd: CampaignEndTypes.FUNDS,
    },
    applicationDetails: {
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
  const router = useRouter()

  const {
    createApplication,
    applicationCreated,
    submitting,
    uploadedFiles,
    error: createCampaignError,
    campaignApplicationResult: camApp,
  } = useCreateApplication()

  const { data: types } = useCampaignTypesList()
  const handleSubmit = async (
    formData: CampaignApplicationFormData,
    { resetForm }: FormikHelpers<CampaignApplicationFormData>,
  ) => {
    if (activeStep === Steps.CREATED_DETAILS && camApp?.id != null) {
      router.push(routes.campaigns.applicationEdit(camApp?.id))
    } else if (shouldSubmit) {
      const createInput = mapCreateInput(formData, types ?? [])
      await createApplication(createInput, files)
      if (applicationCreated) {
        setActiveStep(Steps.CREATED_DETAILS)
        resetForm()
        AlertStore.show(t('alerts.successfully-created'), 'success')
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }, [])

  const [activeStep, setActiveStep] = useState<Steps>(Steps.ORGANIZER)
  const shouldSubmit = activeStep === Steps.CAMPAIGN_DETAILS

  useEffect(() => {
    if (applicationCreated && camApp?.id) {
      setActiveStep(Steps.CREATED_DETAILS)
    }
  }, [applicationCreated])

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
            {activeStep === Steps.CAMPAIGN_BASIC && <CampaignApplicationBasic />}
            {activeStep === Steps.CAMPAIGN_DETAILS && (
              <CampaignApplicationDetails files={files} setFiles={setFiles} />
            )}
            {activeStep === Steps.CREATED_DETAILS && (
              <CampaignApplicationSummary uploadedFiles={uploadedFiles} camApp={camApp} />
            )}
          </Grid>
          <Grid container item alignContent="center">
            <Root
              container
              item
              xs={12}
              spacing={6}
              sx={{ marginTop: 1 }}
              justifyContent="space-between">
              <Grid item xs={12} md={6} flexWrap="nowrap">
                {activeStep === Steps.ORGANIZER ? (
                  <ActionLinkButton
                    fullWidth
                    href=""
                    variant="outlined"
                    startIcon={<ArrowBackIosIcon fontSize="small" />}>
                    {t('cta.back')}
                  </ActionLinkButton>
                ) : (
                  <ActionButton
                    fullWidth
                    onClick={handleBack}
                    startIcon={<ArrowBackIosIcon fontSize="small" />}
                    disabled={
                      applicationCreated /**after campaign application is created disable going back and editing */
                    }>
                    {t('cta.back')}
                  </ActionButton>
                )}
              </Grid>
              <Grid item xs={12} md={6} flexWrap="nowrap">
                <ActionSubmitButton
                  fullWidth
                  label={t(
                    activeStep === Steps.CREATED_DETAILS
                      ? 'result.editButton'
                      : shouldSubmit
                      ? 'cta.submit'
                      : 'cta.next',
                  )}
                  endIcon={<ArrowForwardIosIcon fontSize="small" />}
                  disabled={submitting}
                />
              </Grid>
            </Root>
          </Grid>
        </Grid>
        {(activeStep === Steps.ORGANIZER || activeStep === Steps.CAMPAIGN_BASIC) && (
          <CampaignApplicationRemark />
        )}
        {/* campaign errors */}
        {createCampaignError && (
          <>
            Errors:
            {createCampaignError?.map((e, i) => (
              <p key={i}>{e}</p>
            ))}
          </>
        )}
      </GenericForm>
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
  })

  const fileUpload = useMutation<
    AxiosResponse<UploadCampaignApplicationFilesResponse>,
    AxiosError<ApiErrors>,
    UploadCampaignApplicationFilesRequest
  >({
    mutationFn: useUploadCampaignApplicationFiles(),
  })

  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState<string[]>()
  const [uploadedFiles, setFileUploadState] = useState<Record<'successful' | 'failed', string[]>>({
    successful: [],
    failed: [],
  })
  const [campaignApplicationResult, setCampaignApplicationResult] =
    useState<CreateCampaignApplicationResponse>()

  const createApplication = async (input: CreateCampaignApplicationInput, files: File[]) => {
    if (submitting) {
      return
    }
    setSubmitting(true)

    const dataOrError = await create.mutateAsync(input).catch((e) => e as AxiosError<ApiErrors>)

    if (isAxiosError(dataOrError)) {
      setSubmitting(false)
      if (typeof dataOrError.response?.data.message === 'string') {
        setError([dataOrError.response?.data.message])
      } else {
        setError(dataOrError.response?.data?.message?.flatMap((m) => Object.values(m.constraints)))
      }
      return
    }

    if (dataOrError?.data?.id == null) {
      // it appears the create was not successful after all so still
      setSubmitting(false)
      setError(['could not create a campaign application'])
      return
    }

    const campaignApplication = dataOrError.data
    setCreated(true)
    setCampaignApplicationResult(campaignApplication)

    const uploadedFilesMap = new Map<string, 'success' | 'fail'>()
    await Promise.all(
      files.map((f) =>
        fileUpload
          .mutateAsync({ campaignApplicationId: campaignApplication.id, files: [f] })
          .then(() => {
            uploadedFilesMap.set(f.name, 'success')
          })
          .catch((e) => {
            console.log('----error', e)
            // one of the files was rejected - note
            uploadedFilesMap.set(f.name, 'fail')
          }),
      ),
    )

    const fileUploadResults = [...uploadedFilesMap.entries()].reduce((a, [key, value]) => {
      value === 'fail' ? a.failed.push(key) : a.successful.push(key)
      return a
    }, uploadedFiles)

    setFileUploadState(fileUploadResults)
    setSubmitting(false)

    return { id: campaignApplication.id, ...input }
  }

  return {
    createApplication,
    applicationCreated: created,
    submitting,
    uploadedFiles,
    error,
    campaignApplicationResult,
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

    beneficiary: i.applicationBasic.beneficiaryNames,

    campaignName: i.applicationBasic.title,
    amount: i.applicationBasic.funds?.toString() ?? '',
    goal: i.applicationDetails.cause,
    category: types.find((c) => c.id === i.applicationBasic.campaignType)?.category,
    description: i.applicationDetails.description,
    organizerBeneficiaryRel: i.applicationDetails.organizerBeneficiaryRelationship ?? '-',
    campaignGuarantee: i.applicationDetails.campaignGuarantee,
    history: i.applicationDetails.currentStatus,
    otherFinanceSources: i.applicationDetails.otherFinancialSources,
    campaignEnd: i.applicationBasic.campaignEnd,
  }
}
