import { Grid, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import { CreateCampaignApplicationResponse } from 'gql/campaign-applications'
import { useTranslation } from 'next-i18next'

export interface SummaryProps {
  uploadedFiles: Record<string, string[]>
  camApp?: CreateCampaignApplicationResponse
}

export default function CampaignApplicationSummary({ uploadedFiles, camApp }: SummaryProps) {
  const { t } = useTranslation('campaign-application')

  return (
    <>
      <Typography component="div">
        {uploadedFiles.successful.length > 0 && (
          <p>
            {t('result.uploadOk')}: {uploadedFiles.successful.join()}
          </p>
        )}
        {uploadedFiles.failed.length > 0 && (
          <Typography color={red.A200} border="1px solid" borderColor={red.A400} component="div">
            <p>
              {t('result.uploadFailed')}:{' '}
              {uploadedFiles.failed?.map((f) => (
                // eslint-disable-next-line react/jsx-key
                <Typography>{f}</Typography>
              ))}
            </p>
            <p>{t('result.uploadFailedDirection')}</p>
          </Typography>
        )}
      </Typography>
      <Grid container justifyContent="center" direction="column" alignContent="center">
        <Grid item container justifyContent="space-between" direction="row">
          <Grid item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.organizer.name')} : {camApp?.organizerName ?? '-'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent="space-between" direction="row">
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.organizer.phone')} : {camApp?.organizerPhone ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.organizer.email')}: {camApp?.organizerEmail ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.application.beneficiary')}: {camApp?.beneficiary ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.application.beneficiaryRelationship')}:
              {camApp?.organizerBeneficiaryRel ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.application.campaignTitle')}: {camApp?.campaignName ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.application.funds')}: {camApp?.amount ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.application.campaign-end.title')} {camApp?.campaignEnd ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.details.cause')}: {camApp?.goal ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.details.description')}: {camApp?.description ?? '-'}
            </Typography>
          </Grid>
          <Grid container item xs={12} md={12}>
            <Typography variant="body2">
              {t('steps.details.current-status.label')}: {camApp?.history ?? '-'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
