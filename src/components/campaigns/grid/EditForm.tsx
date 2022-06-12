import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { parse, isDate, format } from 'date-fns'
import { useMutation, useQueryClient } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Link, List, ListItemText, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { AlertStore } from 'stores/AlertStore'
import { useEditCampaign, useUploadCampaignFiles } from 'service/campaign'
import { createSlug } from 'common/util/createSlug'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors, isAxiosError, matchValidator } from 'service/apiErrors'
import {
  CampaignResponse,
  CampaignInput,
  CampaignUploadImage,
  CampaignEditFormData,
} from 'gql/campaigns'
import { CampaignState } from '../helpers/campaign.enums'

import CampaignTypeSelect from '../CampaignTypeSelect'
import CoordinatorSelect from './CoordinatorSelect'
import BeneficiarySelect from './BeneficiarySelect'
import { CampaignFileRole, FileRole, UploadCampaignFiles } from 'components/campaign-file/roles'
import FileList from 'components/file-upload/FileList'
import FileUpload from 'components/file-upload/FileUpload'
import CampaignStateSelect from '../CampaignStateSelect'
import { endpoints } from 'service/apiEndpoints'
import UploadedCampaignFile from './UploadedCampaignFile'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<Omit<CampaignEditFormData, 'campaignFiles'>> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(100).required(),
    description: yup.string().trim().min(50).max(500).required(),
    targetAmount: yup.number().required(),
    allowDonationOnComplete: yup.bool().optional(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().required(),
    coordinatorId: yup.string().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    state: yup.mixed().oneOf(Object.values(CampaignState)).required(),
  })

export default function EditForm({ campaign }: { campaign: CampaignResponse }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])
  const { t } = useTranslation()

  const initialValues: CampaignEditFormData = {
    title: campaign?.title || '',
    coordinatorId: campaign.coordinatorId,
    campaignTypeId: campaign.campaignTypeId,
    beneficiaryId: campaign.beneficiaryId,
    targetAmount: campaign.targetAmount || 0,
    allowDonationOnComplete: campaign.allowDonationOnComplete || false,
    startDate: format(new Date(campaign.startDate ?? new Date()), formatString),
    endDate: format(new Date(campaign.endDate ?? new Date()), formatString),
    state: campaign.state,
    description: campaign.description || '',
    campaignFiles: campaign.campaignFiles || [],
  }

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: useEditCampaign(campaign.id),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      //invalidate query for getting new values
      queryClient.invalidateQueries(endpoints.campaign.viewCampaignById(campaign.id).url)
    },
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignFiles
  >({
    mutationFn: useUploadCampaignFiles(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      //invalidate query for getting new values
      queryClient.invalidateQueries(endpoints.campaign.uploadFile(campaign.id).url)
    },
  })

  const onSubmit = async (
    values: CampaignEditFormData,
    { setFieldError }: FormikHelpers<CampaignEditFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.title),
        description: values.description,
        targetAmount: values.targetAmount,
        allowDonationOnComplete: campaign.allowDonationOnComplete,
        startDate: values.startDate,
        endDate: values.endDate,
        state: values.state,
        essence: campaign.essence,
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        currency: Currency.BGN,
      })

      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          campaignId: campaign.id,
        })
      }

      //Go back to campaign list
      queryClient.invalidateQueries(endpoints.campaign.listAdminCampaigns.url)
      router.push(routes.admin.campaigns.index)
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
          {t('campaigns:edit-form-heading')}
        </Typography>
      </Grid>
      <GenericForm<CampaignEditFormData>
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
          <Grid item xs={12} sm={4}>
            <FormTextField
              type="date"
              name="startDate"
              label="campaigns:campaign.start-date"
              helperText={null}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormTextField
              type="date"
              name="endDate"
              label="campaigns:campaign.end-date"
              helperText={null}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CampaignStateSelect />
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
            <BeneficiarySelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CoordinatorSelect />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              <ListItemText primary={t('campaigns:cta.attached-files')} />
              {(campaign?.campaignFiles || []).map((file, key) => (
                <UploadedCampaignFile key={key} file={file} campaignId={campaign.id} />
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              buttonLabel={t('campaigns:cta.add-files')}
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
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
            <Link href={routes.admin.campaigns.index}>
              <Button fullWidth={true}>{t('Отказ')}</Button>
            </Link>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
