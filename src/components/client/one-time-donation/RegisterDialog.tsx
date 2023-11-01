import { Button, CircularProgress, FormHelperText, Grid, Typography } from '@mui/material'
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
import { StepsContext } from './helpers/stepperContext'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptNewsLetterField from 'components/common/form/AcceptNewsletterField'
import { AccountType, IndividualRegisterFormData } from 'gql/user-registration'

export default function RegisterForm() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { mutateAsync: register } = useRegister()
  const formik = useFormikContext<OneTimeDonation>()
  const { setStep } = useContext(StepsContext)

  const values: IndividualRegisterFormData = {
    type: AccountType.INDIVIDUAL,
    firstName: formik.values.registerFirstName as string,
    lastName: formik.values.registerLastName as string,
    email: formik.values.registerEmail as string,
    password: formik.values.registerPassword as string,
    confirmPassword: formik.values.confirmPassword as string,
    terms: formik.values.terms as boolean,
    gdpr: formik.values.gdpr as boolean,
    newsletter: formik.values.newsletter as boolean,
  }
  const onClick = async () => {
    try {
      setLoading(true)
      // Register in Keycloak

      if (values.terms && values.gdpr && values.password === values.confirmPassword) {
        await register(values)
      } else if (!values.terms) {
        throw new Error('Terms not accepted')
      } else if (!values.gdpr) {
        throw new Error('GDPR not accepted')
      } else {
        throw new Error('Confirm password doesn`t match')
      }

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
      AlertStore.show(t('auth:alerts.register-error'), 'error')
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
          {formik.values.registerPassword !== formik.values.confirmPassword &&
            formik.touched.confirmPassword && (
              <FormHelperText sx={{ color: 'red' }}>
                {t('validation:password-match')}
              </FormHelperText>
            )}
        </Grid>
        <Grid item xs={12}>
          <AcceptTermsField name="terms" />
          {!formik.values.terms && formik.touched.terms && (
            <FormHelperText sx={{ color: 'red' }}>{t('validation:terms-of-use')}</FormHelperText>
          )}
          <AcceptPrivacyPolicyField name="gdpr" />
          {!formik.values.gdpr && formik.touched.gdpr && (
            <FormHelperText sx={{ color: 'red' }}>
              {t('validation:terms-of-service')}
            </FormHelperText>
          )}
          <AcceptNewsLetterField name="newsletter" />
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
