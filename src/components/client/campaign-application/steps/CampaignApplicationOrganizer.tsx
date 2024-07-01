import { useTranslation } from 'next-i18next'

import { FormControl, Grid, Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

import { StyledStepHeading, StyledFormTextField } from '../helpers/campaignApplication.styled'

export default function CampaignApplicationOrganizer() {
  const { t } = useTranslation('campaign-application')

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid item container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.organizer.title')}</StyledStepHeading>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid item xs={12}>
          <StyledFormTextField
            label={t('steps.organizer.name')}
            type="text"
            name="organizer.name"
            autoComplete="name"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={6} justifyContent="space-between" direction="row">
        <Grid container item xs={12} md={6}>
          <StyledFormTextField
            label={t('steps.organizer.phone')}
            type="phone"
            name="organizer.phone"
            autoComplete="tel"
          />
        </Grid>
        <Grid container item xs={12} md={6}>
          <StyledFormTextField
            label={t('steps.organizer.email')}
            type="email"
            name="organizer.email"
            autoComplete="email"
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item container xs={12}>
          <AcceptTermsField name="organizer.acceptTermsAndConditions" />
        </Grid>
        <Grid item container xs={12}>
          <FormControl component="fieldset">
            <CheckboxField
              name="organizer.transparencyTermsAccepted"
              label={
                <Typography variant="body2">{t('steps.organizer.transparencyTerms')}</Typography>
              }
            />
          </FormControl>
        </Grid>
        <Grid item container xs={12}>
          <AcceptPrivacyPolicyField name="organizer.personalInformationProcessingAccepted" />
        </Grid>
      </Grid>
    </Grid>
  )
}
