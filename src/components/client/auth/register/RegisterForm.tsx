import * as yup from 'yup'
import { Grid2 } from '@mui/material'
import React from 'react'
import { email, password, name, confirmPassword } from 'common/form/validation'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import EmailField from 'components/common/form/EmailField'
import { AcceptNewsLetterField } from 'components/common/form/AcceptNewsletterField'

import { AccountType } from 'gql/user-registration'
import { IndividualRegisterFormData } from 'gql/user-registration'
import HelpUsImproveField from 'components/common/form/HelpUsImproveField'

const validationSchema: yup.SchemaOf<IndividualRegisterFormData> = yup
  .object()
  .defined()
  .shape({
    type: yup.mixed<AccountType>().required().oneOf(Object.values(AccountType)),
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    password: password.required(),
    confirmPassword: confirmPassword.required('validation:password-match'),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
    newsletter: yup.bool().required().oneOf([true, false]),
    helpUsImprove: yup.bool().required().oneOf([true, false]),
  })

export type RegisterFormProps = {
  onSubmit: (values: IndividualRegisterFormData) => Promise<void>
  loading: boolean
}

export default function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
  const initialValues: IndividualRegisterFormData = {
    type: AccountType.INDIVIDUAL,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    gdpr: false,
    newsletter: false,
    helpUsImprove: false,
  }
  return (
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
            autoComplete="last-name"
          />
        </Grid2>
        <Grid2 size={12}>
          <EmailField label="auth:fields.email" name="email" />
        </Grid2>
        <Grid2 size={12}>
          <PasswordField autoComplete="new-password" />
        </Grid2>
        <Grid2 size={12}>
          <PasswordField
            name="confirmPassword"
            label="auth:account.confirm-password"
            autoComplete="new-password"
          />
        </Grid2>
        <Grid2 size={12}>
          <AcceptTermsField name="terms" />
          <AcceptPrivacyPolicyField name="gdpr" />
          <AcceptNewsLetterField name="newsletter" />
          <HelpUsImproveField name="helpUsImprove" />
        </Grid2>
        <Grid2 size={12}>
          <SubmitButton fullWidth label="auth:cta.register" loading={loading} />
        </Grid2>
      </Grid2>
    </GenericForm>
  )
}
