import React, { useState } from 'react'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useFormikContext } from 'formik'
import * as yup from 'yup'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import EmailField from 'components/common/form/EmailField'
import { RegisterFormData } from 'components/auth/register/RegisterForm'
import {
  DonationFormDataAuthState,
  DonationFormDataV2,
} from 'components/donation-flow/helpers/types'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'

export const initialRegisterFormValues = {
  registerEmail: '',
  registerPassword: '',
  registerConfirmPassword: '',
  registerFirstName: '',
  registerLastName: '',
  registerGdpr: false,
  registerTerms: false,
}

export const registerFormValidation = {
  registerEmail: yup.string().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.string().email('one-time-donation:errors-fields.email').required(),
  }),
  registerPassword: yup.string().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerConfirmPassword: yup.string().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerFirstName: yup.string().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerLastName: yup.string().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerGdpr: yup.boolean().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.boolean().required(),
  }),
  registerTerms: yup.boolean().when('authentication', {
    is: DonationFormDataAuthState.REGISTER,
    then: yup.boolean().required(),
  }),
}

export default function InlineRegisterForm() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { mutateAsync: register } = useRegister()
  const formik = useFormikContext<DonationFormDataV2>()

  const values: RegisterFormData = {
    firstName: formik.values.registerFirstName as string,
    lastName: formik.values.registerLastName as string,
    email: formik.values.registerEmail as string,
    password: formik.values.registerPassword as string,
    confirmPassword: formik.values.registerConfirmPassword as string,
    terms: formik.values.registerTerms as boolean,
    gdpr: formik.values.registerGdpr as boolean,
  }

  const onClick = async () => {
    try {
      setLoading(true)

      // Register in Keycloak
      await register(values)

      // Authenticate
      const resp = await signIn<'credentials'>('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        setLoading(false)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
        formik.setFieldValue('authentication', DonationFormDataAuthState.AUTHENTICATED)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    }
  }

  return (
    <>
      <Grid container p={2} spacing={3} borderRadius={5}>
        <Grid item xs={12} sm={6}>
          <FormTextField
            type="text"
            label="auth:fields.first-name"
            name="registerFirstName"
            autoComplete="first-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormTextField
            type="text"
            label="auth:fields.last-name"
            name="registerLastName"
            autoComplete="last-name"
          />
        </Grid>
        <Grid item xs={12}>
          <EmailField label="auth:fields.email" name="registerEmail" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField name="registerPassword" autoComplete="new-password" />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            name="confirmPassword"
            label="auth:account.confirm-password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <AcceptTermsField name="registerTerms" />
          <AcceptPrivacyPolicyField name="registerGdpr" />
        </Grid>

        <Grid item xs={12}>
          <Button
            size="large"
            color="primary"
            variant="contained"
            fullWidth
            sx={{ marginTop: theme.spacing(3) }}
            onClick={onClick}>
            {loading ? <CircularProgress color="inherit" size="1.5rem" /> : t('auth:cta.register')}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
