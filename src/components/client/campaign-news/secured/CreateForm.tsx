import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { Button, Grid2, InputAdornment, Tooltip, Typography } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import dynamic from 'next/dynamic'
const FormRichTextField = dynamic(() => import('components/common/form/FormRichTextField'), {
  ssr: false,
})

import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import { useUploadCampaignNewsFiles } from 'service/campaign-news'
import {
  CampaignFileRole,
  CampaignNewsFileRole,
  FileRole,
  UploadCampaignNewsFiles,
} from 'components/common/campaign-file/roles'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import { CampaignUploadImage } from 'gql/campaigns'

import {
  CampaignNewsAdminCreateFormData,
  CampaignNewsInput,
  CampaignNewsResponse,
} from 'gql/campaign-news'

import { useCreateCampaignNews } from 'service/campaign-news'
import { ArticleStatus } from 'components/admin/campaign-news/helpers/article-status.enum'
import ArticleStatusSelect from 'components/admin/campaign-news/ArticleStatusSelect'
import CampaignDropdownSelector from 'components/admin/campaign-news/CampaignDropdownSelector'

const validationSchema: yup.SchemaOf<CampaignNewsAdminCreateFormData> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(200).required(),
    slug: yup.string().trim().min(10).max(200).optional(),
    campaignId: yup.string().uuid().required(),
    author: yup.string().optional(),
    sourceLink: yup.string().optional(),
    description: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
    notify: yup.bool().required(),
  })

export type CampaignFormProps = {
  initialValues?: CampaignNewsAdminCreateFormData
  campaignId?: string
  isAdmin?: boolean
}

export default function CreateForm({ campaignId = '', isAdmin = true }: CampaignFormProps) {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])

  const { t } = useTranslation()

  const initialValues: CampaignNewsAdminCreateFormData = {
    title: '',
    slug: '',
    campaignId: campaignId ?? '',
    author: '',
    sourceLink: '',
    description: '',
    terms: false,
    gdpr: false,
    notify: false,
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
    AxiosResponse<CampaignNewsResponse>,
    AxiosError<ApiErrors>,
    CampaignNewsInput
  >({
    mutationFn: useCreateCampaignNews(),
    onError: (error) => handleError(error),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignNewsFiles
  >({
    mutationFn: useUploadCampaignNewsFiles(),
  })

  const onSubmit = async (
    values: CampaignNewsAdminCreateFormData,
    { setFieldError }: FormikHelpers<CampaignNewsAdminCreateFormData>,
  ) => {
    try {
      const response = await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.slug || values.title),
        campaignId: values.campaignId ?? campaignId,
        author: values.author,
        sourceLink: values.sourceLink,
        description: values.description,
        state: ArticleStatus.draft,
        notify: values.notify,
      })
      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          articleId: response.data.id,
        })
      }
      router.back()
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
    <Grid2 container direction="column" component="section">
      <Grid2 size={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('news:form-heading')}
        </Typography>
      </Grid2>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              label="news:article.title"
              name="title"
              placeholder={t('news:article.title')}
              autoComplete="title"
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              label="news:article.slug.name"
              name="slug"
              placeholder={t('news:article.slug.placeholder')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid2>
          <Grid2 size={12}>
            <CampaignDropdownSelector isDisabled={campaignId ? true : false} />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              label="news:article.author"
              name="author"
              placeholder={t('news:article.author')}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={t('news:article.source-link.field-description')}>
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>
          {/* <Grid2 item xs={12}>
            <FormTextField
              type="text"
              label="news:article.source-link.label"
              name="sourceLink"
              placeholder={t('news:article.source-link.label')}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Tooltip title={t('news:article.source-link.field-description')}>
                      <InfoOutlinedIcon />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2> */}
          <Grid2
            size={{
              xs: 12,
              sm: 4
            }}>
            {isAdmin && <ArticleStatusSelect />}
          </Grid2>
          <Grid2 size={12}>
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid2>
          <Grid2 size={12}>
            <FileUpload
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
                setRoles((prevRoles) => [
                  ...prevRoles,
                  ...newFiles.map((file) => ({
                    file: file.name,
                    role: file.type.startsWith('image')
                      ? CampaignFileRole.gallery
                      : CampaignFileRole.document,
                  })),
                ])
              }}
              buttonLabel={t('campaigns:cta.add-files')}
            />
            <FileList
              rolesList={CampaignNewsFileRole}
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
          </Grid2>
          <Grid2 container direction="column" size={12}>
            <AcceptTermsField name="terms" />
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid2>
          <Grid2 size={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
          </Grid2>
          <Button onClick={() => router.back()} fullWidth={true}>
            {t('Отказ')}
          </Button>
        </Grid2>
      </GenericForm>
    </Grid2>
  );
}
