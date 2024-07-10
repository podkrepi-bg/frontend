import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'
import {
  StyledFormTextField,
  StyledStepHeading,
} from 'components/client/campaign-application/helpers/campaignApplication.styled'

export default function CampaignApplicationAdminPropsEdit() {
  const { t } = useTranslation('campaign-application')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.admin.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <StyledFormTextField label={t('steps.admin.status')} type="text" name="status" />
        </Grid>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6}>
          <StyledFormTextField
            label={t('steps.admin.external-url')}
            type="phone"
            name="ticketUrl"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
