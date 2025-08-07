import { Grid2, StepLabel } from '@mui/material'
import { Person } from 'gql/person'
import { useCallback, useEffect, useState } from 'react'

import {
  CampaignApplicationFormData,
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

import { routes } from 'common/routes'
import { FormikHelpers } from 'formik'
import { CampaignApplicationExisting } from 'gql/campaign-applications'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { mapCreateOrEditInput, useCreateOrEditApplication } from 'service/campaign-application'
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
    createOrUpdateSuccessful: applicationCreated,
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
    { resetForm, setTouched }: FormikHelpers<CampaignApplicationFormData>,
  ) => {
    if (activeStep === Steps.CREATED_DETAILS && camApp?.id != null) {
      router.push(routes.campaigns.applicationEdit(camApp?.id)) // go to the edit page
      if (isEdit) {
        router.reload() // in case we are re-editing refresh the whole page to reset all the things
      }
    } else if (shouldSubmit) {
      const createOrEdit = mapCreateOrEditInput(formData)
      await createOrUpdateApplication(createOrEdit)
      if (applicationCreated) {
        resetForm()
        AlertStore.show(t('alerts.successfully-created'), 'success')
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)

      // reset the touched state b/c every step gets "submitted" in terms of formik and that in turn marks all values as touched
      // the effect is that every step after the first immediately marks all required fields as errored even before the user has touched them
      setTouched({
        applicationDetails: {
          description: false,
          currentStatus: false,
          cause: false,
          documents: false,
        },
        applicationBasic: {
          beneficiaryNames: false,
          title: false,
          campaignType: false,
          funds: false,
          campaignEnd: false,
          campaignEndDate: false,
          organizerBeneficiaryRelationship: false,
        },
      })
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
        <Grid2 container>
          <Grid2 container size={12}>
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
          </Grid2>
          <Grid2 container alignContent="center">
            <Root
              container
              item
              xs={12}
              spacing={6}
              sx={{ marginTop: 1 }}
              justifyContent="space-between">
              <Grid2
                flexWrap="nowrap"
                size={{
                  xs: 12,
                  md: 6,
                }}>
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
              </Grid2>
              <Grid2
                flexWrap="nowrap"
                size={{
                  xs: 12,
                  md: 6,
                }}>
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
              </Grid2>
            </Root>
          </Grid2>
        </Grid2>
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
