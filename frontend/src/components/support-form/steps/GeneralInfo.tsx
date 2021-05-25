import React from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'

import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'

export default function GeneralInfo() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={3} justify="center" direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center" paragraph>
          {t('support:steps.info.subtitle')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          autoFocus
          type="text"
          name="person.email"
          autoComplete="email"
          label="support:steps.info.email"
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          type="text"
          name="person.name"
          autoComplete="name"
          label="support:steps.info.name"
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
      {/* <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          name="person.address"
          autoComplete="address"
          label="support:steps.info.address"
        />
      </Grid> */}
      <Grid item xs={12}>
        <Grid container direction="column" alignItems="flex-start">
          <Grid item xs={12}>
            <AcceptTermsField name="person.terms" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
