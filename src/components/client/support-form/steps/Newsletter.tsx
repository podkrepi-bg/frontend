import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, FormLabel, Grid } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export default function Newsletter() {
  const { t } = useTranslation()

  return (
    <Grid container spacing={6} justifyContent="center" direction="column" alignItems="center">
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('support:steps.newsletter.title')}</FormLabel>
          <CheckboxField label="support:steps.newsletter.label" name="person.newsletter" />
        </FormControl>
      </Grid>
    </Grid>
  )
}
