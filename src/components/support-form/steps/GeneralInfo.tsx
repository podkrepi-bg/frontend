import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, Grid, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from 'components/common/form/CheckboxField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

export default function GeneralInfo() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3} justifyContent="center" direction="column" alignContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" paragraph>
          {t('support:steps.info.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid container spacing={3} justifyContent="center" direction="column">
          <Grid item xs={12}>
            <Grid container spacing={3} justifyContent="center" direction="row">
              <Grid item xs={12} sm={6}>
                <FormTextField
                  autoFocus
                  type="text"
                  name="person.firstName"
                  autoComplete="first-name"
                  label="support:steps.info.first-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormTextField
                  type="text"
                  name="person.lastName"
                  autoComplete="family-name"
                  label="support:steps.info.last-name"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="person.email"
              autoComplete="email"
              label="support:steps.info.email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="person.phone"
              autoComplete="tel"
              label="support:steps.info.phone"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              multiline
              size="medium"
              type="text"
              name="person.comment"
              autoComplete="comment"
              label="support:steps.info.comment"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item xs={12}>
            <AcceptTermsField name="person.terms" />
          </Grid>
          <Grid item xs={12}>
            <AcceptPrivacyPolicyField name="person.gdpr" />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <CheckboxField
                name="person.newsletter"
                label={
                  <Typography variant="body2">{t('support:steps.newsletter.label')}</Typography>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
