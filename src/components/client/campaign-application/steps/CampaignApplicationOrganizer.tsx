import { useTranslation } from 'next-i18next'

import { FormControl, FormHelperText, Grid2, Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

import { StyledStepHeading, StyledFormTextField } from '../helpers/campaignApplication.styled'
import { useFormikContext } from 'formik'
import { CampaignApplicationFormData } from '../helpers/campaignApplication.types'

type Props = {
  isAdmin?: boolean
}

export default function CampaignApplicationOrganizer({ isAdmin }: Props) {
  const { t } = useTranslation('campaign-application')
  const { errors, touched } = useFormikContext<CampaignApplicationFormData>()

  return (
    <Grid2 container spacing={6} justifyContent="center" direction="column" alignContent="center">
      <Grid2 container justifyContent="center">
        <StyledStepHeading variant="h4">{t('steps.organizer.title')}</StyledStepHeading>
      </Grid2>
      <Grid2 container spacing={6} justifyContent="space-between" direction="row">
        <Grid2 size={12}>
          <StyledFormTextField
            label={t('steps.organizer.name')}
            type="text"
            name="organizer.name"
            autoComplete="name"
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={6} justifyContent="space-between" direction="row">
        <Grid2
          container
          size={{
            xs: 12,
            md: 6,
          }}>
          <StyledFormTextField
            label={t('steps.organizer.phone')}
            type="phone"
            name="organizer.phone"
            autoComplete="tel"
          />
        </Grid2>
        <Grid2
          container
          size={{
            xs: 12,
            md: 6,
          }}>
          <StyledFormTextField
            label={t('steps.organizer.email')}
            type="email"
            name="organizer.email"
            autoComplete="email"
          />
        </Grid2>
      </Grid2>
      <Grid2 container spacing={2}>
        <Grid2 container size={12}>
          <AcceptTermsField name="organizer.acceptTermsAndConditions" disabled={isAdmin} />
        </Grid2>
        <Grid2 container size={12}>
          <FormControl component="fieldset">
            <CheckboxField
              name="organizer.transparencyTermsAccepted"
              label={
                <Typography variant="body2">{t('steps.organizer.transparencyTerms')}</Typography>
              }
              disabled={isAdmin}
            />
          </FormControl>
        </Grid2>
        <Grid2 container size={12}>
          <AcceptPrivacyPolicyField
            name="organizer.personalInformationProcessingAccepted"
            disabled={isAdmin}
          />
          {touched.organizer?.personalInformationProcessingAccepted &&
            errors.organizer?.personalInformationProcessingAccepted && (
              <FormHelperText error>
                {t(errors.organizer.personalInformationProcessingAccepted)}
              </FormHelperText>
            )}
        </Grid2>
      </Grid2>
    </Grid2>
  )
}
