import React from 'react'
import * as yup from 'yup'
import { Grid2 } from '@mui/material'
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
  legalEntity: yup.boolean().required(),
  companyName: name,
  companyNumber: yup.string(),
  legalPersonName: name,
  address: yup.string(),
  // Roles
  isBeneficiary: yup.bool().notRequired(),
  isCoordinator: yup.bool().notRequired(),
  isOrganizer: yup.bool().notRequired(),
})

const defaults: PersonFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  legalEntity: false,
  companyName: '',
  companyNumber: '',
  legalPersonName: '',
  address: '',
}

export type PersonFormProps = {
  initialValues?: PersonFormData
  onSubmit: FormikConfig<PersonFormData>['onSubmit']
  beneficiary?: boolean
  coordinator?: boolean
}

export default function PersonForm({ onSubmit, initialValues = defaults }: PersonFormProps) {
  return (
    <Grid2 container direction="column" component="section">
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid2 container spacing={3}>
          <Grid2
            size={{
              xs: 12,
              sm: 6,
            }}>
            <FormTextField
              autoFocus
              type="text"
              label="auth:fields.first-name"
              name="firstName"
              autoComplete="first-name"
            />
          </Grid2>
          <Grid2
            size={{
              xs: 12,
              sm: 6,
            }}>
            <FormTextField
              type="text"
              label="auth:fields.last-name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid2>
          <Grid2 size={12}>
            {/* TODO <CheckboxField
              name="skipRegistration"
              label="Бенефициента ще бъде представляван от организатора"
            /> */}
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              inputMode="email"
              type="text"
              label="auth:fields.email"
              name="email"
              autoComplete="email"
            />
          </Grid2>
          <Grid2 size={12}>
            <FormTextField
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              label="auth:fields.phone"
            />
          </Grid2>
          <CompanyForm />
          <Grid2 margin="auto" size={4}>
            <SubmitButton fullWidth label="campaigns:cta.save" />
          </Grid2>
        </Grid2>
      </GenericForm>
    </Grid2>
  )
}
