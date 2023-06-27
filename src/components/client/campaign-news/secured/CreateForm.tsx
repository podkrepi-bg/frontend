import * as yup from 'yup'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material'
import Link from 'next/link'

import { routes } from 'common/routes'
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
  })

export type CampaignFormProps = {
  initialValues?: CampaignNewsAdminCreateFormData
  campaignId: string
  campaignTitle: string
  isAdmin: boolean
  slug: string
}

export default function CreateForm({
  campaignId,
  campaignTitle,
  slug,
  isAdmin,
}: CampaignFormProps) {
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
      })
      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          articleId: response.data.id,
        })
      }
      router.push(routes.campaigns.news.newsAdminPanel(slug))
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
          {t('news:form-heading')}
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
              label="news:article.title"
              name="title"
              placeholder={t('news:article.title')}
              autoComplete="title"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="news:article.slug.name"
              name="slug"
              placeholder={t('news:article.slug.placeholder')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>{t('news:article.select-campaign')}</InputLabel>
              <Select
                name="campaignId"
                fullWidth
                defaultValue={campaignId}
                value={campaignId}
                label={t('news:article.select-campaign')}
                disabled>
                <MenuItem key={0} value={campaignId}>
                  {campaignTitle}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12} sm={4}>
            {isAdmin && <ArticleStatusSelect />}
          </Grid>
          <Grid item xs={12}>
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid>
          <Grid item xs={12}>
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
          <Link href={routes.campaigns.news.newsAdminPanel(slug)} passHref>
            <Button fullWidth={true}>{t('Отказ')}</Button>
          </Link>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
