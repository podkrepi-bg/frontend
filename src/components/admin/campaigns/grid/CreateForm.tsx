import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { format, parse, isDate } from 'date-fns'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'

import { routes } from 'common/routes'
import { Currency } from 'gql/currency'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'

import dynamic from 'next/dynamic'
const FormRichTextField = dynamic(() => import('components/common/form/FormRichTextField'), {
  ssr: false,
})

import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import { useCreateCampaign, useUploadCampaignFiles } from 'service/campaign'
import {
  CampaignFileRole,
  FileRole,
  UploadCampaignFiles,
} from 'components/common/campaign-file/roles'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import {
  CampaignResponse,
  CampaignInput,
  CampaignUploadImage,
  CampaignAdminCreateFormData,
} from 'gql/campaigns'

import CampaignTypeSelect from '../../../client/campaigns/CampaignTypeSelect'
import CoordinatorSelect from './CoordinatorSelect'
import BeneficiarySelect from './BeneficiarySelect'
import { CampaignState } from '../../../client/campaigns/helpers/campaign.enums'
import { toMoney } from 'common/util/money'
import CurrencySelect from 'components/common/currency/CurrencySelect'
import OrganizerSelect from './OrganizerSelect'
import AllowDonationOnComplete from 'components/common/form/AllowDonationOnComplete'

const formatString = 'yyyy-MM-dd'

const parseDateString = (value: string, originalValue: string) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, formatString, new Date())

  return parsedDate
}

const validationSchema: yup.SchemaOf<CampaignAdminCreateFormData> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(200).required(),
    slug: yup.string().trim().min(10).max(200).optional(),
    description: yup.string().trim().min(50).max(60000).required(),
    targetAmount: yup.number().integer().positive().required(),
    allowDonationOnComplete: yup.bool().optional(),
    campaignTypeId: yup.string().uuid().required(),
    beneficiaryId: yup.string().uuid().required(),
    coordinatorId: yup.string().uuid().required(),
    organizerId: yup.string().uuid().required(),
    startDate: yup.date().transform(parseDateString).required(),
    state: yup.mixed().oneOf(Object.values(CampaignState)).required(),
    endDate: yup
      .date()
      .transform(parseDateString)
      .min(yup.ref('startDate'), `end date can't be before start date`),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
    currency: yup.mixed().oneOf(Object.values(Currency)).required(),
  })

const defaults: CampaignAdminCreateFormData = {
  title: '',
  slug: '',
  campaignTypeId: '',
  beneficiaryId: '',
  coordinatorId: '',
  organizerId: '',
  targetAmount: 1000,
  allowDonationOnComplete: false,
  startDate: format(new Date(), formatString),
  state: CampaignState.draft,
  endDate: '',
  description: '',
  terms: false,
  gdpr: false,
  currency: Currency.BGN,
}

export type CampaignFormProps = { initialValues?: CampaignAdminCreateFormData }

export default function CampaignForm({ initialValues = defaults }: CampaignFormProps) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])

  const { t } = useTranslation()

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
    mutationFn: useCreateCampaign(),
    onError: (error) => handleError(error),
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
    values: CampaignAdminCreateFormData,
    { setFieldError }: FormikHelpers<CampaignAdminCreateFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.slug || values.title),
        description: values.description,
        targetAmount: toMoney(values.targetAmount),
        allowDonationOnComplete: values.allowDonationOnComplete,
        startDate: values.startDate,
        endDate: values.endDate,
        state: values.state,
        essence: '',
        campaignTypeId: values.campaignTypeId,
        beneficiaryId: values.beneficiaryId,
        coordinatorId: values.coordinatorId,
        organizerId: values.organizerId,
        currency: values.currency.toString(),
      })
      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          campaignId: response.data.id,
        })
      }
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
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="campaigns:campaign.slug.name"
              name="slug"
              placeholder={t('campaigns:campaign.slug.placeholder')}
              InputLabelProps={{ shrink: true }}
            />
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
            <CurrencySelect />
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
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12}>
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid>
          <Grid item xs={12}>
            <p>
              Select a Beneficiery or{' '}
              <Link href={routes.admin.beneficiary.create} passHref>
                Create New
              </Link>
            </p>
            <BeneficiarySelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>
              Select a Coordinator or{' '}
              <Link href={routes.admin.coordinators.add} passHref>
                Create New
              </Link>
            </p>
            <CoordinatorSelect />
          </Grid>
          <Grid item xs={12} sm={6}>
            <p>
              Select an Organizer or{' '}
              <Link href={routes.admin.organizers.create} passHref>
                Create New
              </Link>
            </p>
            <OrganizerSelect />
          </Grid>
          <Grid item xs={12}>
            <FileUpload
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
              buttonLabel={t('campaigns:cta.add-files')}
            />
            <FileList
              filesRole={roles}
              files={files}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
              onSetFileRole={(file, role) => {
                setRoles((prevRoles) => [
                  ...prevRoles.filter((f) => f.file !== file.name),
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
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid>
          <Link href={routes.admin.campaigns.index} passHref>
            <Button fullWidth={true}>{t('Отказ')}</Button>
          </Link>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
