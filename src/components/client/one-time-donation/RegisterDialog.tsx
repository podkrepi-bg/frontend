import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import theme from 'common/theme'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import EmailField from 'components/common/form/EmailField'
import { useFormikContext } from 'formik'
import { OneTimeDonation } from 'gql/donations'
import { RegisterFormData } from 'components/client/auth/register/RegisterForm'
import { StepsContext } from './helpers/stepperContext'

export default function RegisterForm() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { mutateAsync: register } = useRegister()
  const formik = useFormikContext<OneTimeDonation>()
  const { setStep } = useContext(StepsContext)

  const values: RegisterFormData = {
    firstName: formik.values.registerFirstName as string,
    lastName: formik.values.registerLastName as string,
    email: formik.values.registerEmail as string,
    password: formik.values.registerPassword as string,
    confirmPassword: formik.values.confirmPassword as string,
    terms: formik.values.terms as boolean,
    gdpr: formik.values.gdpr as boolean,
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
        formik.setFieldValue('isAnonymous', false)
        setStep(2)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    }
  }

  return (
    <>
      <Typography variant="subtitle2" fontWeight="bold">
        {t('one-time-donation:second-step.new-create-profile')}
      </Typography>
      <Grid container spacing={3} p={5} borderRadius={5}>
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
