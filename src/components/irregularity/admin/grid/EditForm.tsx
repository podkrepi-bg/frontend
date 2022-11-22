import * as yup from 'yup'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Button, Grid, List, ListItemText, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import createStyles from '@mui/styles/createStyles'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import FileUpload from 'components/file-upload/FileUpload'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { ApiErrors } from 'service/apiErrors'

import { CampaignResponse } from 'gql/campaigns'
import {
  IrregularityEditInput,
  IrregularityFileResponse,
  IrregularityInput,
  IrregularityResponse,
  IrregularityUploadImage,
  NotifierTypes,
  IrregularityReason,
  IrregularityStatus,
  UploadIrregularityFiles,
} from 'components/irregularity/helpers/irregularity.types'
import { email, name, phone } from 'common/form/validation'

import { endpoints } from 'service/apiEndpoints'
import { editIrregularity, uploadIrregularityFiles } from 'service/irregularity'

import IrregularityFile from './IrregularityFile'
import FileList from 'components/irregularity/helpers/FileList'
import CampaignSelect from 'components/campaigns/CampaignSelect'
import NotifierTypeSelect from 'components/irregularity/helpers/NotifierTypeSelect'
import StatusSelect from 'components/irregularity/helpers/StatusSelect'
import IrregularityReasonSelect from 'components/irregularity/helpers/IrregularityReasonSelect'

const validationSchema: yup.SchemaOf<IrregularityInput> = yup
  .object()
  .defined()
  .shape({
    campaignId: yup.string().uuid().required(),
    description: yup.string().trim().max(500).required(),
    notifierType: yup.mixed().oneOf(Object.values(NotifierTypes)).required(),
    reason: yup.mixed().oneOf(Object.values(IrregularityReason)).required(),
    status: yup.mixed().oneOf(Object.values(IrregularityStatus)).required(),
    person: yup.object().shape({
      firstName: name.required(),
      lastName: name.required(),
      email: email.required(),
      phone: phone.notRequired(),
    }),
  })

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    content: {
      '& textarea': { resize: 'vertical' },
    },
  }),
)

type Props = {
  campaigns: CampaignResponse[]
  irregularity: IrregularityResponse
  irregularityFiles: IrregularityFileResponse[]
}

export default function EditForm({ campaigns, irregularity, irregularityFiles }: Props) {
  const { t } = useTranslation('irregularity')
  const router = useRouter()
  const queryClient = useQueryClient()
  const classes = useStyles()

  const [files, setFiles] = useState<File[]>([])

  const initialValues: IrregularityEditInput = {
    description: irregularity.description,
    notifierType: irregularity.notifierType,
    reason: irregularity.reason,
    status: irregularity.status,
    campaignId: irregularity.campaignId,
    personId: irregularity.personId,
    person: {
      firstName: irregularity.person.firstName,
      lastName: irregularity.person.lastName,
      email: irregularity.person.email,
      phone: irregularity.person.phone,
    },
  }

  const irregularityMutation = useMutation<
    AxiosResponse<IrregularityResponse>,
    AxiosError<ApiErrors>,
    IrregularityEditInput
  >({
    mutationFn: editIrregularity(irregularity.id),
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<IrregularityUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadIrregularityFiles
  >({
    mutationFn: uploadIrregularityFiles(),
  })

  const onSubmit = async (values: IrregularityEditInput) => {
    try {
      await irregularityMutation.mutateAsync({
        description: values.description,
        notifierType: values.notifierType,
        reason: values.reason,
        status: values.status,
        campaignId: values.campaignId,
        personId: values.personId,
        person: {
          firstName: values.person.firstName,
          lastName: values.person.lastName,
          email: values.person.email,
          phone: values.person.phone,
        },
      })
      await fileUploadMutation.mutateAsync({
        files,
        irregularityId: irregularity.id,
      })
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries([endpoints.irregularity.viewIrregularity(irregularity.id).url])
      router.push(routes.admin.irregularity.index)
    } catch (error) {
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('admin.edit-form')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormTextField
                type="string"
                name="person.firstName"
                label={t('admin.fields.firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField
                type="string"
                name="person.lastName"
                label={t('admin.fields.lastName')}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormTextField type="email" name="person.email" label={t('admin.fields.email')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormTextField type="phone" name="person.phone" label={t('admin.fields.phone')} />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <NotifierTypeSelect />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CampaignSelect
                label={t('admin.fields.campaign')}
                name="campaignId"
                campaigns={campaigns}
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={12} sm={6}>
              <StatusSelect />
            </Grid>
            <Grid item xs={12} sm={6}>
              <IrregularityReasonSelect name="reason" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="text"
              name="description"
              label={t('admin.fields.description')}
              className={classes.content}
            />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              <ListItemText primary={t('cta.attached-files')} />
              {irregularityFiles.map((file, key) => (
                <IrregularityFile key={key} file={file} irregularityId={irregularity.id} />
              ))}
            </List>
          </Grid>
          <Grid item xs={12}>
            <FileUpload
              onUpload={(newFiles) => {
                setFiles((prevFiles) => [...prevFiles, ...newFiles])
              }}
              buttonLabel={t('cta.upload-files')}
            />
            <FileList
              files={files}
              onDelete={(deletedFile) =>
                setFiles((prevFiles) => prevFiles.filter((file) => file.name !== deletedFile.name))
              }
            />
          </Grid>
          <Grid container item spacing={3} justifyContent="space-between">
            <Grid item xs={4}>
              <Link href={routes.admin.irregularity.index} passHref>
                <Button fullWidth>{t('admin.cta.back')}</Button>
              </Link>
            </Grid>
            <Grid item xs={4}>
              <SubmitButton fullWidth label={t('admin.cta.submit')} />
            </Grid>
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
