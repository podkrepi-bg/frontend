import React from 'react'
import * as yup from 'yup'
import { Grid } from '@mui/material'
import { FormikConfig } from 'formik'

import GenericForm from 'components/common/form/GenericForm'
import { name, phone, email } from 'common/form/validation'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import { PersonFormData } from 'gql/person'
import CompanyForm from './CompanyForm'

const validationSchema: yup.SchemaOf<PersonFormData> = yup.object().defined().shape({
  // Person
  firstName: name.required(),
  lastName: name.required(),
  email: email.required(),
  phone: phone.required(),
  // Company
  company: name,
  legalPersonName: name,
  adress: yup.string(),
})

const defaults: PersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  adress: '',
}

export type PersonFormProps = {
  initialValues?: PersonFormData
  onSubmit: FormikConfig<PersonFormData>['onSubmit']
  beneficiary?: boolean
  coordinator?: boolean
}

export default function PersonForm({ onSubmit, initialValues = defaults }: PersonFormProps) {
  return (
    <Grid container direction="column" component="section">
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormTextField
              autoFocus
              type="text"
              label="auth:fields.first-name"
              name="firstName"
              autoComplete="first-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField
              type="text"
              label="auth:fields.last-name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              inputMode="email"
              type="text"
              label="auth:fields.email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              label="auth:fields.phone"
            />
          </Grid>
          <CompanyForm />
          <Grid item xs={4} margin="auto">
            <SubmitButton fullWidth label="campaigns:cta.save" />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
