import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import NextLink from 'next/link'
import {
  Button,
  Grid,
  InputAdornment,
  List,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { createSlug } from 'common/util/createSlug'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import CampaignDropdownSelector from './CampaignDropdownSelector'

import dynamic from 'next/dynamic'
const FormRichTextField = dynamic(() => import('components/common/form/FormRichTextField'), {
  ssr: false,
})

import { ApiErrors, handleUniqueViolation, isAxiosError, matchValidator } from 'service/apiErrors'
import { CampaignUploadImage } from 'gql/campaigns'
import { ArticleStatus } from './helpers/article-status.enum'
import {
  CampaignFileRole,
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
import ArticleStatusSelect from './ArticleStatusSelect'
import UploadedCampaignFile from './UploadedCampaignFile'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

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
  })

export default function EditForm({ article }: { article: AdminCampaignNewsResponse }) {
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
      router.push(routes.admin.news.index)
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
          {t('news:edit-form-heading')}
        </Typography>
      </Grid>
      <GenericForm<CampaignNewsInput>
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="news:article.title"
              name="title"
              autoComplete="title"
            />
          </Grid>
          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={12}>
            <CampaignDropdownSelector />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="Автор"
              name="author"
              placeholder={'Автор'}
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
              label="Линк към източник"
              name="sourceLink"
              placeholder={'Линк към източник'}
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
            <ArticleStatusSelect />
          </Grid>
          <Grid item xs={12}>
            <Typography>{t('campaigns:campaign.description')}</Typography>
            <FormRichTextField name="description" />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              <ListItemText primary={t('campaigns:cta.attached-files')} />
              {(article?.newsFiles || []).map((file, key) => (
                <UploadedCampaignFile key={key} file={file} articleId={article.id} />
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
