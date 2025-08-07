import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, Grid2, Typography } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'
import CheckboxField from 'components/common/form/CheckboxField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import HeaderTypography from '../helpers/HeaderTypography'

export default function GeneralInfo() {
  const { t } = useTranslation()

  return (
    <Grid2 container spacing={3} justifyContent="center" direction="column" alignContent="center">
      <Grid2 size={12}>
        <HeaderTypography>{t('support:steps.info.subtitle')}</HeaderTypography>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 8
        }}>
        <Grid2 container spacing={3} justifyContent="center" direction="column">
          <Grid2 size={12}>
            <Grid2 container spacing={3} justifyContent="center" direction="row">
              <Grid2
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <FormTextField
                  autoFocus
                  type="text"
                  name="person.firstName"
                  autoComplete="first-name"
                  label="support:steps.info.first-name"
                />
              </Grid2>
              <Grid2
                size={{
                  xs: 12,
                  sm: 6
                }}>
                <FormTextField
                  type="text"
                  name="person.lastName"
                  autoComplete="family-name"
                  label="support:steps.info.last-name"
                />
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              name="person.email"
              autoComplete="email"
              label="support:steps.info.email"
            />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="text"
              name="person.phone"
              autoComplete="tel"
              label="support:steps.info.phone"
            />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              multiline
              size="medium"
              type="text"
              name="person.comment"
              autoComplete="comment"
              label="support:steps.info.comment"
            />
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 8
        }}>
        <Grid2 container direction="column" alignItems="flex-start">
          <Grid2 size={12}>
            <AcceptTermsField name="person.terms" />
          </Grid2>
          <Grid2 size={12}>
            <AcceptPrivacyPolicyField name="person.gdpr" />
          </Grid2>
          <Grid2 size={12}>
            <FormControl component="fieldset">
              <CheckboxField
                name="person.newsletter"
                label={
                  <Typography variant="body2">{t('support:steps.newsletter.label')}</Typography>
                }
              />
            </FormControl>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
