import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'

import { SupportFormData } from '../helpers/support-form.models'

type NewsletterProps = { formik: FormikProps<SupportFormData> }
export default function Newsletter({ formik }: NewsletterProps) {
  const { t } = useTranslation()

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{t('common:support-form.steps.newsletter.title')}</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.terms}
            onChange={formik.handleChange}
            name="terms"
            color="primary"
          />
        }
        label={t('common:support-form.steps.newsletter.label')}
      />
    </FormControl>
  )
}
