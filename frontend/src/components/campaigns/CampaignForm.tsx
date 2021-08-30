import * as yup from 'yup'
import { FormikHelpers } from 'formik'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import { ApiErrors } from 'common/api-routes'
import { AlertStore } from 'stores/AlertStore'
import GenericForm from 'components/common/form/GenericForm'
import SubmitButton from 'components/common/form/SubmitButton'
import FormTextField from 'components/common/form/FormTextField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import { name, companyName, phone, email } from 'common/form/validation'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

export type CampaignFormData = {
  firstName: string
  lastName: string
  email: string
  company?: string
  phone?: string
  message: string
  terms: boolean
  gdpr: boolean
}

const validationSchema: yup.SchemaOf<CampaignFormData> = yup
  .object()
  .defined()
  .shape({
    firstName: name.required(),
    lastName: name.required(),
    email: email.required(),
    company: companyName,
    phone: phone.required(),
    message: yup.string().trim().min(10).max(500).required(),
    terms: yup.bool().required().oneOf([true], 'validation:terms-of-use'),
    gdpr: yup.bool().required().oneOf([true], 'validation:terms-of-service'),
  })

const defaults: CampaignFormData = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  message: '',
  terms: false,
  gdpr: false,
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

export type CampaignFormProps = { initialValues?: CampaignFormData }

export default function CampaignForm({ initialValues = defaults }: CampaignFormProps) {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

  const onSubmit = async (
    values: CampaignFormData,
    { setFieldError, resetForm }: FormikHelpers<CampaignFormData>,
  ) => {
    console.log(values)
    try {
      setLoading(true)
      const response = await fetch('/api/campaign/create', {
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
          {t('campaigns:form-heading')}
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
            <AcceptPrivacyPolicyField name="gdpr" />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton fullWidth label="campaigns:cta.save" loading={loading} />
          </Grid>
        </Grid>
      </GenericForm>
    </Grid>
  )
}
