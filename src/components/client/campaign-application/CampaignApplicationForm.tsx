import { Grid, StepLabel } from '@mui/material'
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
import CampaignApplicationBasic from './steps/CampaignApplicationBasic'
import CampaignApplicationDetails from './steps/CampaignApplicationDetails'
import CampaignApplicationOrganizer from './steps/CampaignApplicationOrganizer'
import CampaignApplicationRemark from './steps/CampaignApplicationRemark'
import CampaignApplicationStepperIcon from './steps/CampaignApplicationStepperIcon'

import { validationSchema } from './helpers/validation-schema'

import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { routes } from 'common/routes'
import { FormikHelpers } from 'formik'
import {
  CampaignApplicationExisting,
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
  UploadCampaignApplicationFilesRequest,
  UploadCampaignApplicationFilesResponse,
} from 'gql/campaign-applications'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { ApiErrors } from 'service/apiErrors'
import {
  useCreateCampaignApplication,
  useDeleteCampaignApplicationFile,
  useUpdateCampaignApplication,
  useUploadCampaignApplicationFiles,
} from 'service/campaign-application'
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
  isEdit?: boolean
  campaignApplication?: CampaignApplicationExisting
}

export default function CampaignApplicationForm({
  person,
  isEdit,
  campaignApplication: existing,
}: Props) {
  const { t } = useTranslation('campaign-application')
  const router = useRouter()

  const {
    createOrUpdateApplication,
    applicationCreated,
    submitting,
    uploadedFiles,
    error: createCampaignError,
    campaignApplicationResult: camApp,
    files,
    setFiles,
    initialValues,
    deletedFiles,
  } = useCreateOrEditApplication({
    person,
    isEdit,
    campaignApplication: existing,
  })

  const handleSubmit = async (
    formData: CampaignApplicationFormData,
    { resetForm }: FormikHelpers<CampaignApplicationFormData>,
  ) => {
    if (activeStep === Steps.CREATED_DETAILS && camApp?.id != null) {
      router.push(routes.campaigns.applicationEdit(camApp?.id)) // go to the edit page
      router.reload() // in case we are re-editing refresh the whole page to reset all the things
    } else if (shouldSubmit) {
      const createInput = mapCreateInput(formData)
      await createOrUpdateApplication(createInput, files)
      if (applicationCreated) {
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

  // move to last step after campaign application created successfully
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
              <CampaignApplicationSummary
                uploadedFiles={uploadedFiles}
                camApp={camApp}
                deletedFiles={deletedFiles}
                isEdit={isEdit}
              />
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
                    disabled
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

export interface CreateOrEditApplication {
  person?: Person
  isEdit?: boolean
  campaignApplication?: CampaignApplicationExisting
}

const useCreateOrEditApplication = ({
  person,
  isEdit,
  campaignApplication: existing,
}: CreateOrEditApplication) => {
  const initialValues: CampaignApplicationFormData = mapExistingOrNew(isEdit, existing, person)

  const [files, setFiles] = useState<File[]>(
    existing?.documents?.map((d) => ({ name: d.filename } as File)) ?? [],
  )
  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState<string[]>()
  const [uploadedFiles, setFileUploadState] = useState<Record<'successful' | 'failed', string[]>>({
    successful: [],
    failed: [],
  })
  const [deletedFiles, setFileDeletedState] = useState<Record<'successful' | 'failed', string[]>>({
    successful: [],
    failed: [],
  })
  const [campaignApplicationResult, setCampaignApplicationResult] =
    useState<CreateCampaignApplicationResponse>()

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

  const fileDelete = useMutation({
    mutationFn: useDeleteCampaignApplicationFile(),
  })

  const update = useMutation<
    AxiosResponse<CreateCampaignApplicationResponse>,
    AxiosError<ApiErrors>,
    [CreateCampaignApplicationInput, string]
  >({
    mutationFn: useUpdateCampaignApplication(),
  })

  const createOrUpdateApplication = async (
    input: CreateCampaignApplicationInput,
    files: File[],
  ) => {
    if (submitting) {
      return
    }
    setSubmitting(true)

    const dataOrError =
      isEdit && typeof existing?.id === 'string'
        ? await update.mutateAsync([input, existing?.id])
        : await create.mutateAsync(input).catch((e) => e as AxiosError<ApiErrors>)

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
    const deletedFilesMap = new Map<string, 'success' | 'fail'>()
    const filesToUpload = isEdit
      ? files.filter(
          (f) => f.size > 0 && !existing?.documents.some((d) => d.filename === f.name),
        ) ?? []
      : files
    const filesToDelete =
      existing?.documents.filter((d) => !files.some((f) => f.name === d.filename)) ?? []

    await Promise.all([
      ...filesToDelete.map((f) =>
        fileDelete
          .mutateAsync(f.id)
          .then(() => deletedFilesMap.set(f.filename, 'success'))
          .catch(() => deletedFilesMap.set(f.filename, 'fail')),
      ),
      ...filesToUpload.map((f) =>
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
    ])

    const fileUploadResults = [...uploadedFilesMap.entries()].reduce((a, [key, value]) => {
      value === 'fail' ? a.failed.push(key) : a.successful.push(key)
      return a
    }, uploadedFiles)
    const fileDeleteResults = [...deletedFilesMap.entries()].reduce((a, [key, value]) => {
      value === 'fail' ? a.failed.push(key) : a.successful.push(key)
      return a
    }, deletedFiles)

    setFileUploadState(fileUploadResults)
    setFileDeletedState(fileDeleteResults)
    setSubmitting(false)

    return { id: campaignApplication.id, ...input }
  }

  return {
    createOrUpdateApplication,
    applicationCreated: created,
    submitting,
    uploadedFiles,
    error,
    campaignApplicationResult,
    files,
    setFiles,
    initialValues,
    deletedFiles,
  }
}

function mapExistingOrNew(
  isEdit: boolean | undefined,
  existing: CampaignApplicationExisting | undefined,
  person: Person | undefined,
): CampaignApplicationFormData {
  return {
    organizer: {
      name: (isEdit ? existing?.organizerName : `${person?.firstName} ${person?.lastName}`) ?? '',
      phone: (isEdit ? existing?.organizerPhone : person?.phone) ?? '',
      email: (isEdit ? existing?.organizerEmail : person?.email) ?? '',
      acceptTermsAndConditions: isEdit ? true : false,
      transparencyTermsAccepted: isEdit ? true : false,
      personalInformationProcessingAccepted: isEdit ? true : false,
    },
    applicationBasic: {
      title: existing?.campaignName ?? '',
      beneficiaryNames: existing?.beneficiary ?? '',
      campaignType: existing?.campaignTypeId ?? '',
      funds: isNaN(parseInt(existing?.amount ?? '')) ? 0 : parseInt(existing?.amount ?? '0'),
      campaignEnd: existing?.campaignEnd ?? CampaignEndTypes.FUNDS,
    },
    applicationDetails: {
      campaignGuarantee: existing?.campaignGuarantee ?? '',
      cause: existing?.goal ?? '',
      currentStatus: existing?.history ?? '',
      description: existing?.description ?? '',
      links: [],
      organizerBeneficiaryRelationship: '-',
      otherFinancialSources: '',
    },
  }
}

function mapCreateInput(i: CampaignApplicationFormData): CreateCampaignApplicationInput {
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
    description: i.applicationDetails.description,
    organizerBeneficiaryRel: i.applicationDetails.organizerBeneficiaryRelationship ?? '-',
    campaignGuarantee: i.applicationDetails.campaignGuarantee,
    history: i.applicationDetails.currentStatus,
    otherFinanceSources: i.applicationDetails.otherFinancialSources,
    campaignEnd: i.applicationBasic.campaignEnd,
    campaignTypeId: i.applicationBasic.campaignType,
  }
}
