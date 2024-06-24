import { useTranslation } from 'next-i18next'

import { Grid } from '@mui/material'

import { StyledStepHeading, StyledFormTextField } from '../helpers/campaignApplication.styled'

export default function CampaignApplicationOrganizer() {
  const { t } = useTranslation('campaign-application')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.organizer.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <StyledFormTextField
            autoFocus
            label={t('steps.organizer.first-name')}
            type="text"
            name="organizer.firstName"
            autoComplete="first-name"
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <StyledFormTextField
            label={t('steps.organizer.last-name')}
            type="text"
            name="organizer.lastName"
            autoComplete="family-name"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <StyledFormTextField
            label={t('steps.organizer.phone')}
            type="phone"
            name="organizer.phone"
            autoComplete="tel"
          />
        </Grid>
        <Grid container item xs={12} md={6} flexWrap="nowrap">
          <StyledFormTextField
            label={t('steps.organizer.email')}
            type="email"
            name="organizer.email"
            autoComplete="email"
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
