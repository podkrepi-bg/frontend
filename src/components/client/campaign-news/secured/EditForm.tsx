import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import {
  Button,
  Grid2,
  InputAdornment,
  List,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

import dynamic from 'next/dynamic'
const FormRichTextField = dynamic(() => import('components/common/form/FormRichTextField'), {
  ssr: false,
})

import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import { CampaignUploadImage } from 'gql/campaigns'
import { ArticleStatus } from 'components/admin/campaign-news/helpers/article-status.enum'
import ArticleStatusSelect from 'components/admin/campaign-news/ArticleStatusSelect'
import {
  CampaignFileRole,
  CampaignNewsFileRole,
  FileRole,
  UploadCampaignNewsFiles,
} from 'components/common/campaign-file/roles'
import FileList from 'components/common/file-upload/FileList'
import FileUpload from 'components/common/file-upload/FileUpload'

import { endpoints } from 'service/apiEndpoints'
import {
  AdminCampaignNewsResponse,
  CampaignNewsInput,
  CampaignNewsResponse,
} from 'gql/campaign-news'
import { useEditNewsArticle, useUploadCampaignNewsFiles } from 'service/campaign-news'

import UploadedCampaignFile from 'components/admin/campaign-news/UploadedCampaignFile'
import CampaignDropdownSelector from 'components/admin/campaign-news/CampaignDropdownSelector'
import CheckboxField from 'components/common/form/CheckboxField'

const validationSchema: yup.SchemaOf<CampaignNewsInput> = yup
  .object()
  .defined()
  .shape({
    title: yup.string().trim().min(10).max(200).required(),
    slug: yup.string().trim().min(10).max(200).required(),
    campaignId: yup.string().uuid().required(),
    author: yup.string().optional(),
    sourceLink: yup.string().optional(),
    state: yup.mixed().oneOf(Object.values(ArticleStatus)).required(),
    description: yup.string().required(),
    notify: yup.bool().required(),
  })

type Props = {
  article: AdminCampaignNewsResponse
  campaignId?: string
  isAdmin?: boolean
}

export default function EditForm({ article, campaignId = '', isAdmin = true }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [files, setFiles] = useState<File[]>([])
  const [roles, setRoles] = useState<FileRole[]>([])
  const [slugWasChanged, setSlugWasChanged] = useState<boolean>(false)

  const { t } = useTranslation()

  const initialValues: CampaignNewsInput = {
    title: article?.title || '',
    slug: article?.slug || '',
    campaignId: article?.campaignId || '',
    author: article?.author || '',
    sourceLink: article?.sourceLink || '',
    state: article?.state,
    description: article?.description,
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
    mutationFn: useEditNewsArticle(article.id),
    onError: (error) => handleError(error),
    onSuccess: () => {
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      //invalidate query for getting new values
      queryClient.invalidateQueries([endpoints.campaignNews.viewNewsArticleById(article.id).url])
    },
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignNewsFiles
  >({
    mutationFn: useUploadCampaignNewsFiles(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      //invalidate query for getting new values
      queryClient.invalidateQueries([endpoints.campaignNews.viewNewsArticleById(article.id).url])
    },
  })

  const onSubmit = async (
    values: CampaignNewsInput,
    { setFieldError }: FormikHelpers<CampaignNewsInput>,
  ) => {
    try {
      await mutation.mutateAsync({
        title: values.title,
        slug: createSlug(values.slug),
        campaignId: values.campaignId,
        author: values.author,
        sourceLink: values.sourceLink,
        state: values.state,
        description: values.description,
        notify: values.notify,
      })

      if (files.length > 0) {
        await fileUploadMutation.mutateAsync({
          files,
          roles,
          articleId: article.id,
        })
      }

      //Go back to campaign list
      queryClient.invalidateQueries([endpoints.campaignNews.listAdminNews.url])
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
          {t('news:edit-form-heading')}
        </Typography>
      </Grid2>
      <GenericForm<CampaignNewsInput>
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid2 container spacing={3}>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              label="news:article.title"
              name="title"
              autoComplete="title"
            />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              label="news:article.slug.name"
              name="slug"
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value !== article?.slug
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
              {slugWasChanged && t('news:article.slug.warning')}
            </Typography>
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
              sm: 4,
            }}>
            {isAdmin && <ArticleStatusSelect />}
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 4,
            }}>
            {isAdmin && (
              <CheckboxField
                name="notify"
                label={<Typography variant="body2">{t('campaigns:campaign.notify')}</Typography>}
              />
            )}
          </Grid2>
          <Grid2 size={12}>
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid2>
          <Grid2 size={12}>
            <List dense>
              <ListItemText primary={t('campaigns:cta.attached-files')} />
              {(article?.newsFiles || []).map((file, key) => (
                <UploadedCampaignFile key={key} file={file} articleId={article.id} />
              ))}
            </List>
          </Grid2>
          <Grid2 size={12}>
            <FileUpload
              buttonLabel={t('campaigns:cta.add-files')}
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
            />
            <FileList
              rolesList={CampaignNewsFileRole}
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
          </Grid2>
          <Grid2 size={12}>
            <SubmitButton fullWidth label="campaigns:cta.submit" loading={mutation.isLoading} />
            <Button onClick={() => router.back()} fullWidth>
              {t('Отказ')}
            </Button>
          </Grid2>
        </Grid2>
      </GenericForm>
    </Grid2>
  )
}
