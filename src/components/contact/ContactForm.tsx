import React from 'react'
import * as yup from 'yup'
import { useTranslation } from 'react-i18next'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'

import SubmitButton from 'components/common/form/SubmitButton'
import GenericForm from 'components/common/form/GenericForm'
import FormTextField from 'components/common/form/FormTextField'
import { name, phone } from 'common/form/validation'

export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  message: string
}

const validationSchema: yup.SchemaOf<ContactFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: yup.string().email().required(),
    company: name,
    phone: phone,
    message: yup.string().min(30).max(500).required(),
  })

const defaults: ContactFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
}

const useStyles = makeStyles((theme) =>
  createStyles({
    heading: {
      marginBottom: theme.spacing(5),
      color: theme.palette.primary.dark,
      textAlign: 'center',
    },
  }),
)

export type ContactFormProps = { initialValues?: ContactFormData }

export default function ContactForm({ initialValues = defaults }: ContactFormProps) {
  const classes = useStyles()
  const { t } = useTranslation()

  const onSubmit = async (values: ContactFormData) => {
    console.log(values)

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: values && JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
    console.log(response)
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
            <FormTextField type="text" label="auth:fields.email" name="email" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField type="tel" label="auth:fields.phone" name="phone" autoComplete="tel" />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              label="auth:fields.company"
              name="company"
              autoComplete="organization"
            />
          </Grid>
          <Grid item xs={12}>
            <FormTextField
              type="text"
              multiline
              rows={4}
              label="auth:fields.message"
              name="message"
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton label="auth:cta.send" fullWidth />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
