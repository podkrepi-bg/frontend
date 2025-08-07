import React from 'react'
import { useField } from 'formik'
import { Grid2 } from '@mui/material'

import FormTextField from 'components/common/form/FormTextField'
import LegalEntityField from 'components/common/form/LegalEntityField'

export default function CompanyForm() {
  const [field] = useField('legalEntity')
  if (!field.value) {
    return (
      <Grid2 size={12}>
        <LegalEntityField name="legalEntity" />
      </Grid2>
    )
  }
  return (
    <>
      <Grid2 size={12}>
        <LegalEntityField name="legalEntity" />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 6,
        }}>
        <FormTextField type="text" label="Име на фирма" name="companyName" autoComplete="company" />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 6,
        }}>
        <FormTextField
          type="text"
          label="ЕИК по БУЛСТАТ"
          name="companyNumber"
          autoComplete="bulstat"
        />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 6,
        }}>
        <FormTextField type="text" label="МОЛ" name="legalPersonName" autoComplete="name" />
      </Grid2>
      <Grid2
        size={{
          xs: 12,
          sm: 6,
        }}>
        <FormTextField
          type="text"
          name="address"
          autoComplete="address"
          label="Адрес на седалище"
        />
      </Grid2>
    </>
  )
}
