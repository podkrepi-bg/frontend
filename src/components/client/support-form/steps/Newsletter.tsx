import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, FormLabel, Grid2 } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export default function Newsletter() {
  const { t } = useTranslation()

  return (
    <Grid2 container spacing={6} justifyContent="center" direction="column" alignItems="center">
      <Grid2 size={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">{t('support:steps.newsletter.title')}</FormLabel>
          <CheckboxField label="support:steps.newsletter.label" name="person.newsletter" />
        </FormControl>
      </Grid2>
    </Grid2>
  );
}
