import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useMemo, useState } from 'react'
import { parse, isDate, format } from 'date-fns'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import NextLink from 'next/link'
import { Button, Grid, List, ListItemText, Typography } from '@mui/material'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { AlertStore } from 'stores/AlertStore'
import { useEditCampaign, useUploadCampaignFiles } from 'service/campaign'
import { createSlug } from 'common/util/createSlug'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'

import dynamic from 'next/dynamic'
const FormRichTextField = dynamic(() => import('components/common/form/FormRichTextField'), {
  ssr: false,
})

import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import {
  CampaignResponse,
  CampaignInput,
  CampaignUploadImage,
  CampaignEditFormData,
  AdminSingleCampaignResponse,
} from 'gql/campaigns'
import { CampaignState } from '../../../client/campaigns/helpers/campaign.enums'

import CampaignTypeSelect from '../../../client/campaigns/CampaignTypeSelect'
import CoordinatorSelect from './CoordinatorSelect'
import BeneficiarySelect from './BeneficiarySelect'
import {
  CampaignFileRole,
  FileRole,
  UploadCampaignFiles,
} from 'components/common/campaign-file/roles'
import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'
import CampaignStateSelect from '../../../client/campaigns/CampaignStateSelect'
import { endpoints } from 'service/apiEndpoints'
import UploadedCampaignFile from './UploadedCampaignFile'
import { fromMoney, toMoney } from 'common/util/money'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import OrganizerSelect from './OrganizerSelect'
import AllowDonationOnComplete from '../../../common/form/AllowDonationOnComplete'

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
    title: yup.string().trim().min(10).max(200).required(),
    slug: yup.string().trim().min(10).max(200).required(),
    description: yup.string().trim().min(50).max(60000).required(),
    targetAmount: yup.number().integer().positive().required(),
    allowDonationOnComplete: yup.bool().optional(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().required(),
    coordinatorId: yup.string().required(),
    organizerId: yup.string().required(),
    startDate: yup.date().transform(parseDateString).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    state: yup.mixed().oneOf(Object.values(CampaignState)).required(),
    currency: yup.mixed().oneOf(Object.values(Currency)).required(),
  })

const statesForDisableCurrencySelect = [
  CampaignState.rejected,
  CampaignState.suspended,
  CampaignState.complete,
  CampaignState.disabled,
  CampaignState.error,
  CampaignState.deleted,
  CampaignState.active,
]

export default function EditForm({ campaign }: { campaign: AdminSingleCampaignResponse }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])
  const [slugWasChanged, setSlugWasChanged] = useState<boolean>(false)

  const { t } = useTranslation()

  const incomingTransfersAmount = useMemo(() => {
    return campaign.incomingTransfers.reduce((acc, transfer) => {
      return acc + transfer.amount
    }, 0)
  }, [campaign])

  const donationsAmount = useMemo(() => {
    if (campaign.vaults)
      return campaign.vaults.reduce((acc, vault) => {
        return acc + vault.amount
      }, 0)
    else return 0
  }, [campaign])

  const IsCurrencySelectDisabled =
    incomingTransfersAmount > 0 ||
    donationsAmount > 0 ||
    statesForDisableCurrencySelect.includes(campaign.state)

  const initialValues: CampaignEditFormData = {
    title: campaign?.title || '',
    slug: campaign?.slug || '',
    coordinatorId: campaign.coordinatorId,
    campaignTypeId: campaign.campaignTypeId,
    beneficiaryId: campaign.beneficiaryId,
    organizerId: campaign.organizerId || '',
    targetAmount: fromMoney(campaign.targetAmount) || 0,
    allowDonationOnComplete: campaign.allowDonationOnComplete || false,
    startDate: format(new Date(campaign.startDate ?? new Date()), formatString),
    endDate: campaign.endDate ? format(new Date(campaign.endDate), formatString) : '',
    state: campaign.state,
    description: campaign.description || '',
    campaignFiles: campaign.campaignFiles || [],
    currency: Currency[campaign.currency as keyof typeof Currency],
  }

  const handleError = (e: AxiosError<ApiErrors>) => {
    const error = e.response

    if (error?.status === 409) {
      const message = error.data.message.map((el) => handleUniqueViolation(el.constraints, t))
      return AlertStore.show(message.join('/n'), 'error')
    }

    AlertStore.show(t('common:alerts.error'), 'error')
  }

  const mutation = useMutation<
    AxiosResponse<CampaignResponse>,
    AxiosError<ApiErrors>,
    CampaignInput
  >({
    mutationFn: useEditCampaign(campaign.id),
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      //invalidate query for getting new values
      queryClient.invalidateQueries([endpoints.campaign.viewCampaignById(campaign.id).url])
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
      queryClient.invalidateQueries([endpoints.campaign.viewCampaignById(campaign.id).url])
    },
  })

  const onSubmit = async (
    values: CampaignEditFormData,
    { setFieldError }: FormikHelpers<CampaignEditFormData>,
  ) => {
    try {
      await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.slug),
        description: values.description,
        targetAmount: toMoney(values.targetAmount),
        allowDonationOnComplete: values.allowDonationOnComplete,
        startDate: values.startDate,
        endDate: values.endDate,
        state: values.state,
        essence: campaign.essence,
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        organizerId: values.organizerId,
        currency: values.currency,
      })

      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          campaignId: campaign.id,
        })
      }

      //Go back to campaign list
      queryClient.invalidateQueries([endpoints.campaign.listAdminCampaigns.url])
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
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.slug.name"
              name="slug"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value !== campaign.slug
                  ? setSlugWasChanged(true)
                  : setSlugWasChanged(false)
              }}
            />
            <Typography
              component="span"
              sx={(theme) => ({
                ml: 1,
                color: theme.palette.error.dark,
                fontSize: 'small',
              })}>
              {slugWasChanged && t('campaigns:campaign.slug.warning')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CampaignTypeSelect />
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormTextField
              type="number"
              name="targetAmount"
              autoComplete="target-amount"
              label="campaigns:campaign.amount"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <CurrencySelect disabled={IsCurrencySelectDisabled} />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AllowDonationOnComplete name="allowDonationOnComplete" />
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
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid>
          <Grid item xs={12}>
            <p>
              Select a Beneficiery or{' '}
              <NextLink href={routes.admin.beneficiary.create} passHref>
                Create New
              </NextLink>
            </p>
            <BeneficiarySelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>
              Select a Coordinator or{' '}
              <NextLink href={routes.admin.coordinators.add} passHref>
                Create New
              </NextLink>
            </p>
            <CoordinatorSelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>
              Select an Organizer or{' '}
              <NextLink href={routes.admin.organizers.create} passHref>
                Create New
              </NextLink>
            </p>
            <OrganizerSelect />
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
            <NextLink href={routes.admin.campaigns.index} passHref>
              <Button fullWidth>{t('Отказ')}</Button>
            </NextLink>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
