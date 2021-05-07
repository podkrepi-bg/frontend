import React from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, FormLabel } from '@material-ui/core'
import CheckboxField from 'components/common/form/CheckboxField'

export default function Newsletter() {
  const { t } = useTranslation()

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('support:steps.newsletter.title')}</FormLabel>
      <CheckboxField label={t('support:steps.newsletter.label')} name="newsletter" />
    </FormControl>
  )
}
