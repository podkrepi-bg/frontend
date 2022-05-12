import * as yup from 'yup'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { Button, Grid, List, Typography } from '@mui/material'
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
  CampaignReportEditInput,
  CampaignReportFile,
  CampaignReportInput,
  CampaignReportResponse,
  CampaignReportUploadImage,
  NotifierTypes,
  ReportReason,
  ReportStatus,
  UploadCampaignReportFiles,
} from 'components/irregularity-report/helpers/report.types'
import { email, name, phone } from 'common/form/validation'

import { endpoints } from 'service/apiEndpoints'
import { editCampaignReport, uploadCampaignReportFiles } from 'service/campaignReport'

import ReportFile from './ReportFile'
import FileList from 'components/irregularity-report/helpers/FileList'
import CampaignSelect from 'components/campaigns/CampaignSelect'
import NotifierTypeSelect from 'components/irregularity-report/helpers/NotifierTypeSelect'
import StatusSelect from 'components/irregularity-report/helpers/StatusSelect'
import ReportReasonSelect from 'components/irregularity-report/helpers/ReportReasonSelect'

const validationSchema: yup.SchemaOf<CampaignReportInput> = yup
  .object()
  .defined()
  .shape({
    campaignId: yup.string().uuid().required(),
    reportContent: yup.string().trim().max(500).required(),
    notifierType: yup.mixed().oneOf(Object.values(NotifierTypes)).required(),
    reason: yup.mixed().oneOf(Object.values(ReportReason)).required(),
    status: yup.mixed().oneOf(Object.values(ReportStatus)).required(),
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
  report: CampaignReportResponse
  reportFiles: CampaignReportFile[]
}

export default function EditForm({ campaigns, report, reportFiles }: Props) {
  const { t } = useTranslation('irregularity-report')
  const router = useRouter()
  const queryClient = useQueryClient()
  const classes = useStyles()

  const [files, setFiles] = useState<File[]>([])

  const initialValues: CampaignReportEditInput = {
    reportContent: report.reportContent,
    notifierType: report.notifierType,
    reason: report.reason,
    status: report.status,
    campaignId: report.campaignId,
    personId: report.personId,
    person: {
      firstName: report.person.firstName,
      lastName: report.person.lastName,
      email: report.person.email,
      phone: report.person.phone,
    },
  }

  const reportMutation = useMutation<
    AxiosResponse<CampaignReportResponse>,
    AxiosError<ApiErrors>,
    CampaignReportEditInput
  >({
    mutationFn: editCampaignReport(report.id),
  })

  const fileUploadMutation = useMutation<
    AxiosResponse<CampaignReportUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignReportFiles
  >({
    mutationFn: uploadCampaignReportFiles(),
  })

  const onSubmit = async (values: CampaignReportEditInput) => {
    try {
      await reportMutation.mutateAsync({
        reportContent: values.reportContent,
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
        campaignReportId: report.id,
      })
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries(endpoints.campaignReport.viewCampaignReport(report.id).url)
      router.push(routes.admin.campaignReport.index)
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
              <ReportReasonSelect name="reason" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={5}
              multiline
              type="text"
              name="reportContent"
              label={t('admin.fields.content')}
              className={classes.content}
            />
          </Grid>
          <Grid item xs={12}>
            <List dense>
              {reportFiles.map((file, key) => (
                <ReportFile key={key} file={file} reportId={report.id} />
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
              <Link href={routes.admin.campaignReport.index} passHref>
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
