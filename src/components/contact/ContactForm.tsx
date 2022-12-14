import React from 'react'
import * as yup from 'yup'
import { AxiosError, AxiosResponse } from 'axios'
import { FormikHelpers } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'
import { createContactRequest } from 'service/contact'
import { isAxiosError, ApiErrors, matchValidator } from 'service/apiErrors'
import { ContactFormData, ContactRequestResponse, ContactRequestInput } from 'gql/contact'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { name, companyName, phone, email } from 'common/form/validation'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import EmailField from 'components/common/form/EmailField'

const validationSchema: yup.SchemaOf<ContactFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    company: companyName,
    phone: phone.required(),
    message: yup.string().trim().min(10).max(2000).required(),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  terms: false,
  gdpr: false,
}

export type ContactFormProps = { initialValues?: ContactFormData }

export default function ContactForm({ initialValues = defaults }: ContactFormProps) {
  const { t } = useTranslation()
  const mutationFn = createContactRequest
  const mutation = useMutation<
    AxiosResponse<ContactRequestResponse>,
    AxiosError<ApiErrors>,
    ContactRequestInput
  >({
    mutationFn,
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const onSubmit = async (
    values: ContactFormData,
    { setFieldError, resetForm }: FormikHelpers<ContactFormData>,
  ) => {
    try {
      await mutation.mutateAsync(values)
      resetForm()
    } catch (error) {
      if (isAxiosError(error)) {
        const { response } = error as AxiosError<ApiErrors>
        response?.data.message.map(({ property, constraints }) => {
          setFieldError(property, t(matchValidator(constraints)))
        })
      }
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography
          variant="h5"
          component="h2"
          sx={(theme) => ({
            mb: 5,
            color: theme.palette.primary.dark,
            textAlign: 'center',
          })}>
          {t('contact:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormTextField
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
            <EmailField label="auth:fields.email" name="email" />
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
          <Grid item xs={12}>
            <FormTextField
              type="text"
              name="company"
              label="auth:fields.company"
              autoComplete="organization"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              rows={4}
              multiline
              type="text"
              name="message"
              label="auth:fields.message"
              sx={{ '& textarea': { resize: 'vertical' } }}
            />
          </Grid>
          <Grid item xs={12}>
            <AcceptTermsField name="terms" />
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="auth:cta.send" loading={mutation.isLoading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
