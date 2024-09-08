import { Grid, Typography } from '@mui/material'
import { green, orange, red } from '@mui/material/colors'
import { CreateCampaignApplicationResponse } from 'gql/campaign-applications'
import { useTranslation } from 'next-i18next'

export interface SummaryProps {
  uploadedFiles: Record<string, string[]>
  camApp?: CreateCampaignApplicationResponse
  deletedFiles?: Record<string, string[]>
  isEdit?: boolean
}

function FilesDetail({
  label,
  files,
  type,
}: {
  label: string
  files?: string[]
  type?: 'success' | 'failure' | 'successful-delete'
}) {
  return (
    Number(files?.length) > 0 && (
      <>
        <Grid item xs={12} md={6}>
          {label}
        </Grid>
        <Grid item xs={12} md={6}>
          {files?.map((f) => (
            <Typography
              key={f}
              component="p"
              color={
                type === 'success'
                  ? green[300]
                  : type === 'failure'
                  ? red.A200
                  : type === 'successful-delete'
                  ? orange[100]
                  : undefined
              }>
              {f}
            </Typography>
          ))}
        </Grid>
      </>
    )
  )
}

function CamAppDetail({ label, value }: { label: string; value?: string }) {
  const normalized = typeof value === 'string' && value.trim() != '' ? value : '-'
  return (
    <>
      <Grid item xs={12} md={6}>
        {label}
      </Grid>
      <Grid item xs={12} md={6}>
        {normalized}
      </Grid>
    </>
  )
}

export default function CampaignApplicationSummary({
  uploadedFiles,
  camApp,
  deletedFiles,
  isEdit,
}: SummaryProps) {
  const { t } = useTranslation('campaign-application')

  return (
    <>
      <Typography variant="h3">{t(isEdit ? 'result.edited' : 'result.created')}</Typography>
      <Typography component="div" variant="subtitle1">
        <Grid container justifyContent="center" direction="column" alignContent="center">
          <Grid item container justifyContent="space-between" direction="row">
            <FilesDetail
              label={t('result.uploadOk')}
              files={uploadedFiles.successful}
              type="success"
            />
            <FilesDetail
              label={t('result.deleteOk')}
              files={deletedFiles?.successful}
              type="successful-delete"
            />
            {uploadedFiles.failed.length > 0 && (
              <>
                <FilesDetail
                  label={t('result.uploadFailed')}
                  files={uploadedFiles.failed}
                  type="failure"
                />
                <p>{t('result.uploadFailedDirection')}</p>
              </>
            )}
            {deletedFiles && deletedFiles.failed.length > 0 && (
              <>
                <FilesDetail
                  label={t('result.deleteFailed')}
                  files={deletedFiles.failed}
                  type="failure"
                />
                <p>{t('result.uploadFailedDirection')}</p>
              </>
            )}
            <CamAppDetail label={t('steps.organizer.name')} value={camApp?.organizerName} />
            <CamAppDetail label={t('steps.organizer.phone')} value={camApp?.organizerPhone} />
            <CamAppDetail label={t('steps.organizer.email')} value={camApp?.organizerEmail} />
            <CamAppDetail label={t('steps.application.beneficiary')} value={camApp?.beneficiary} />
            <CamAppDetail
              label={t('steps.application.beneficiaryRelationship')}
              value={camApp?.organizerBeneficiaryRel}
            />
            <CamAppDetail
              label={t('steps.application.campaignTitle')}
              value={camApp?.campaignName}
            />
            <CamAppDetail label={t('steps.application.funds')} value={camApp?.amount} />
            <CamAppDetail
              label={t('steps.application.campaign-end.title')}
              value={camApp?.campaignEnd}
            />
            <CamAppDetail label={t('steps.details.cause')} value={camApp?.goal} />
            <CamAppDetail label={t('steps.details.description')} value={camApp?.description} />
            <CamAppDetail label={t('steps.details.current-status.label')} value={camApp?.history} />
          </Grid>
        </Grid>
      </Typography>
    </>
  )
}
