import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'

import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'

export default function GeneralInfo() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center" paragraph>
          {t('common:support-form.steps.info.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          autoFocus
          type="text"
          name="info.email"
          autoComplete="email"
          label="common:support-form.steps.info.email"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          name="info.name"
          autoComplete="name"
          label="common:support-form.steps.info.name"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          name="info.phone"
          autoComplete="tel"
          label="common:support-form.steps.info.phone"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          name="info.address"
          autoComplete="address"
          label="common:support-form.steps.info.address"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item xs={12}>
            <AcceptTermsField name="terms" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
