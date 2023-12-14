import * as yup from 'yup'
import { Grid } from '@mui/material'
import React from 'react'
import { email, password, name, confirmPassword, companyName } from 'common/form/validation'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import EmailField from 'components/common/form/EmailField'
import { AcceptNewsLetterField } from 'components/common/form/AcceptNewsletterField'

import { AccountType } from 'gql/user-registration'
import { validateEIK13, validateEIK9 } from 'components/common/validations/EIKValidator'
import { CorporateRegisterFormData } from 'gql/user-registration'

const validationSchema: yup.SchemaOf<CorporateRegisterFormData> = yup
  .object()
  .defined()
  .shape({
    type: yup.mixed<AccountType>().required().oneOf(Object.values(AccountType)),
    companyName: companyName.required(),
    companyNumber: yup
      .string()
      .required()
      .test('eik-validation', function (value) {
        if (!value) {
          return true
        }
        const isValidEIK = validateEIK9(value) || validateEIK13(value)
        return isValidEIK
      }),
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    password: password.required(),
    confirmPassword: confirmPassword.required('validation:password-match'),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
    newsletter: yup.bool().required().oneOf([true, false]),
  })

export type RegisterFormProps = {
  onSubmit: (values: CorporateRegisterFormData) => Promise<void>
  loading: boolean
}

export default function CorporateRegisterForm({ onSubmit, loading }: RegisterFormProps) {
  const initialValues: CorporateRegisterFormData = {
    type: AccountType.CORPORATE,
    companyName: '',
    companyNumber: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
    gdpr: false,
    newsletter: false,
  }
  return (
    <GenericForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            label="auth:fields.company-name"
            name="companyName"
            autoComplete="company-name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            label="auth:fields.company-number"
            name="companyNumber"
            autoComplete="company-number"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            label="auth:fields.company-representitive-first-name"
            name="firstName"
            autoComplete="company-representitive-first-name"
          />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            type="text"
            label="auth:fields.company-representitive-last-name"
            name="lastName"
            autoComplete="company-representitive-first-name"
          />
        </Grid>
        <Grid item xs={12}>
          <EmailField label="auth:fields.email" name="email" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField autoComplete="new-password" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            name="confirmPassword"
            label="auth:account.confirm-password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <AcceptTermsField name="terms" />
          <AcceptPrivacyPolicyField name="gdpr" />
          <AcceptNewsLetterField name="newsletter" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton fullWidth label="auth:cta.register" loading={loading} />
        </Grid>
      </Grid>
    </GenericForm>
  )
}
