import { Checkbox, FormControl, FormControlLabel, FormLabel } from '@material-ui/core'
import { FormikProps } from 'formik'
import React from 'react'
import { SupportFormData } from '../types/SuportFormData'

type GDRPProps = { formik: FormikProps<SupportFormData> }
export default function GDPR({ formik }: GDRPProps) {
  return (
    <FormControl required error={!!formik.errors.terms} component="fieldset">
      <FormLabel component="legend">GDPR</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formik.values.terms}
            onChange={formik.handleChange}
            name="terms"
            color="primary"
          />
        }
        label="Съгласен съм"
      />
    </FormControl>
  )
}
