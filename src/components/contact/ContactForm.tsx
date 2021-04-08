import React, { useState } from 'react'
import { FormikHelpers } from 'formik'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import { name, companyName, phone } from 'common/form/validation'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { AlertStore } from 'stores/AlertStore'
import { ApiErrors } from 'common/api-routes'

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  message: string
  terms: boolean
}

const validationSchema: yup.SchemaOf<ContactFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: yup.string().trim().email().required(),
    company: companyName,
    phone: phone.required(),
    message: yup.string().trim().min(10).max(500).required(),
    terms: yup.bool().required().oneOf([true], 'support:termsHelperText'),
  })

const defaults: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  terms: false,
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
    message: {
      '& textarea': { resize: 'vertical' },
    },
  }),
)

export type ContactFormProps = { initialValues?: ContactFormData }

export default function ContactForm({ initialValues = defaults }: ContactFormProps) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = async (
    values: ContactFormData,
    { setFieldError, resetForm }: FormikHelpers<ContactFormData>,
  ) => {
    console.log(values)
    try {
      setLoading(true)
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: values && JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
      setLoading(false)
      console.log(response)
      if (response.status >= 299) {
        const json: ApiErrors = await response.json()
        if ('validation' in json) {
          json.validation?.map(({ field, validator, message, customMessage }) => {
            setFieldError(field, t(`validation:${customMessage ? message : validator}`))
          })
        }
        throw new Error()
      }
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      resetForm()
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('common:alerts.error'), 'error')
    }
  }

  return (
    <Grid container direction="column" component="section">
      <Grid item xs={12}>
        <Typography variant="h5" component="h2" className={classes.heading}>
          {t('contact:form-heading')}
        </Typography>
      </Grid>
      <GenericForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormTextField type="text" label="auth:fields.first-name" name="firstName" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormTextField type="text" label="auth:fields.last-name" name="lastName" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField inputMode="email" type="text" label="auth:fields.email" name="email" />
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
              className={classes.message}
            />
          </Grid>
          <Grid item xs={12}>
            <AcceptTermsField name="terms" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="auth:cta.send" loading={loading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
