import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { FormControl, FormLabel } from '@material-ui/core'
import CheckboxField from 'components/common/form/CheckboxField'

export type NewsletterProps = {
  preChecked?: boolean
}

export default function Newsletter({ preChecked }: NewsletterProps) {
  const { t } = useTranslation()

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('common:support-form.steps.newsletter.title')}</FormLabel>
      <CheckboxField
        preChecked={preChecked}
        label={t('common:support-form.steps.newsletter.label')}
        name="newsletter"
      />
    </FormControl>
  )
}
