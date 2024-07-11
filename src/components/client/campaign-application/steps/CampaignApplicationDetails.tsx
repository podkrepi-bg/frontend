import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import { StyledStepHeading } from '../helpers/campaignApplication.styled'
import FormTextField from 'components/common/form/FormTextField'

import theme from 'common/theme'
import FileUpload from 'components/common/file-upload/FileUpload'

export default function CampaignApplicationDetails() {
  const { t } = useTranslation('campaign-application')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.details.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="details.description"
            label={t('steps.details.description')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="details.currentStatus"
            label={t('steps.details.current-status.label')}
            placeholder={t('steps.details.current-status.placeholder')}
            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            name="details.cause"
            label={t('steps.details.cause')}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: theme.typography.pxToRem(16), paddingBottom: 2 }}>
            {t('steps.details.links.label')}
          </Typography>
          <Grid container item spacing={2} xs={12}>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.website"
                label=""
                placeholder={t('steps.details.links.fields.website')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.media"
                label=""
                placeholder={t('steps.details.links.fields.media')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.facebook"
                label=""
                placeholder={t('steps.details.links.fields.facebook')}
              />
            </Grid>
            <Grid item xs={12}>
              <FormTextField
                type="text"
                name="details.links.donationPlatform"
                label=""
                placeholder={t('steps.details.links.fields.donation-platforms')}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FileUpload buttonLabel={t('steps.details.photos')} onUpload={(files) => {}} />
        </Grid>
        <Grid item xs={12}>
          <FileUpload buttonLabel={t('steps.details.documents')} onUpload={(files) => {}} />
        </Grid>
      </Grid>
    </Grid>
  )
}
