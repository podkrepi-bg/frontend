import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { format, parse, isDate } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import { Grid, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { PersonFormData } from 'gql/person'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import FileList from 'components/common/file-upload/FileList'
import PersonDialog from 'components/common/person/PersonDialog'
import FileUpload from 'components/common/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import {
  CampaignFileRole,
  FileRole,
  UploadCampaignFiles,
} from 'components/common/campaign-file/roles'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import { useCreateCampaign, useUploadCampaignFiles } from 'service/campaign'
import {
  CampaignResponse,
  CampaignCreateFormData,
  CampaignInput,
  CampaignUploadImage,
} from 'gql/campaigns'
import { CampaignState } from './helpers/campaign.enums'
import CampaignTypeSelect from './CampaignTypeSelect'

import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AllowDonationOnComplete from 'components/common/form/AllowDonationOnComplete'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<CampaignCreateFormData> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(200).required(),
    slug: yup.string().optional(),
    description: yup.string().trim().min(50).max(60000).required(),
    targetAmount: yup.number().required(),
    allowDonationOnComplete: yup.bool().optional(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().uuid().required(),
    coordinatorId: yup.string().uuid().required(),
    organizerId: yup.string().uuid().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
    state: yup.mixed().oneOf(Object.values(CampaignState)).required(),
  })

const defaults: CampaignCreateFormData = {
  title: '',
  campaignTypeId: '',
  beneficiaryId: '',
  coordinatorId: '',
  organizerId: '',
  targetAmount: 1000,
  allowDonationOnComplete: false,
  startDate: format(new Date(), formatString),
  endDate: format(new Date().setMonth(new Date().getMonth() + 1), formatString),
  description: '',
  state: CampaignState.draft,
  terms: false,
  gdpr: false,
}

export type CampaignFormProps = { initialValues?: CampaignCreateFormData }

export default function CampaignForm({ initialValues = defaults }: CampaignFormProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [coordinator, setCoordinator] = useState<PersonFormData>()
  const [beneficiary, setBeneficiary] = useState<PersonFormData>()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: useCreateCampaign(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignFiles
  >({
    mutationFn: useUploadCampaignFiles(),
  })

  const onSubmit = async (
    values: CampaignCreateFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignCreateFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        targetAmount: values.targetAmount,
        allowDonationOnComplete: values.allowDonationOnComplete,
        startDate: values.startDate,
        endDate: values.endDate,
        essence: '',
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        organizerId: values.organizerId,
        currency: Currency.BGN,
        state: CampaignState.draft,
      })
      await fileUploadMutation.mutateAsync({
        files,
        roles,
        campaignId: response.data.id,
      })
      resetForm()
      router.push(routes.campaigns.viewCampaignBySlug(response.data.slug))
    } catch (error) {
      console.error(error)
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('campaigns:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.title"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CampaignTypeSelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="number"
              name="targetAmount"
              autoComplete="target-amount"
              label="campaigns:campaign.amount"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AllowDonationOnComplete name="allowDonationOnComplete" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="startDate"
              label="campaigns:campaign.start-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="date"
              name="endDate"
              label="campaigns:campaign.end-date"
              helperText={null}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="text"
              name="description"
              label="campaigns:campaign.description"
              autoComplete="description"
              sx={{ '& textarea': { resize: 'vertical' } }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {coordinator ? (
              <Typography fontWeight="bold" variant="body2">
                {coordinator?.firstName} {coordinator?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="coordinator"
                label={t('campaigns:campaign.coordinator.add')}
                onSubmit={async (values: PersonFormData) => {
                  setCoordinator(values)
                }}
              />
            )}
            <input type="hidden" name="coordinatorId" />
          </Grid>
          <Grid item xs={12} sm={6}>
            {beneficiary ? (
              <Typography fontWeight="bold" variant="body2">
                {beneficiary?.firstName} {beneficiary?.lastName}
              </Typography>
            ) : (
              <PersonDialog
                type="beneficiary"
                label={t('campaigns:campaign.beneficiary.add')}
                onSubmit={async (values: PersonFormData) => {
                  setBeneficiary(values)
                }}
              />
            )}
            <input type="hidden" name="beneficiaryId" />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              buttonLabel="Добави снимки"
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
                setRoles((prevRoles) => [
                  ...prevRoles,
                  ...newFiles.map((file) => ({
                    file: file.name,
                    role: CampaignFileRole.background,
                  })),
                ])
              }}
            />
            <FileList
              files={files}
              filesRole={roles}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
              onSetFileRole={(file, role) => {
                setRoles((filesRole) => [
                  ...filesRole.filter((f) => f.file !== file.name),
                  { file: file.name, role },
                ])
              }}
            />
          </Grid>
          <Grid item container direction="column" xs={12}>
            <AcceptTermsField name="terms" />
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              fullWidth
              label="campaigns:cta.submit"
              loading={mutation.isLoading}
              color="info"
            />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
