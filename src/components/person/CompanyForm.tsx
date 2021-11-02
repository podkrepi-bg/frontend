import React from 'react'
import { useField } from 'formik'
import { Grid } from '@mui/material'

import CompanyField from 'components/common/form/CompanyField'
import FormTextField from 'components/common/form/FormTextField'

export default function CompanyForm() {
  const [field] = useField('legalEntity')
  if (!field.value) return null
  return (
    <>
      <Grid item xs={12}>
        <CompanyField name="legalEntity" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField type="text" label="Име на фирма" name="companyName" autoComplete="company" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          label="ЕИК по БУЛСТАТ"
          name="companyNumber"
          autoComplete="bulstat"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField type="text" label="МОЛ" name="legalPersonName" autoComplete="name" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormTextField
          type="text"
          name="address"
          autoComplete="address"
          label="Адрес на седалище"
        />
      </Grid>
    </>
  )
}
