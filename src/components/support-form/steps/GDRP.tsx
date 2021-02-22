import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProps } from 'formik'
import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'

import { SupportFormData } from '../helpers/support-form.models'

type GDRPProps = { formik: FormikProps<SupportFormData> }
export default function GDPR({ formik }: GDRPProps) {
  const { t } = useTranslation()

  return (
    <FormControl required error={!!formik.errors.terms} component="fieldset">
      <FormLabel component="legend">{t('common:support-form.steps.gdpr.label')}</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.terms}
            onChange={formik.handleChange}
            name="terms"
            color="primary"
          />
        }
        label={t('common:support-form.steps.gdpr.terms')}
      />
    </FormControl>
  )
}
