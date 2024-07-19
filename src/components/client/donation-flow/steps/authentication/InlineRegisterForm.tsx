import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import * as yup from 'yup'
import { Button, CircularProgress, FormHelperText, Grid } from '@mui/material'
import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'

import theme from 'common/theme'
import { useRegister } from 'service/auth'
import { AlertStore } from 'stores/AlertStore'
import FormTextField from 'components/common/form/FormTextField'
import PasswordField from 'components/common/form/PasswordField'
import EmailField from 'components/common/form/EmailField'

import {
  DonationFormAuthState,
  DonationFormData,
} from 'components/client/donation-flow/helpers/types'
import AcceptTermsField from 'components/common/form/AcceptTermsField'
import AcceptPrivacyPolicyField from 'components/common/form/AcceptPrivacyPolicyField'
import { AccountType, IndividualRegisterFormData } from 'gql/user-registration'
import { ids } from '../../common/DonationFormSections'

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
    is: DonationFormAuthState.REGISTER,
    then: yup.string().email('donation-flow:general.error.email').required(),
  }),
  registerPassword: yup.string().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerConfirmPassword: yup.string().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerFirstName: yup.string().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerLastName: yup.string().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.string().required(),
  }),
  registerGdpr: yup.boolean().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.boolean().required(),
  }),
  registerTerms: yup.boolean().when('authentication', {
    is: DonationFormAuthState.REGISTER,
    then: yup.boolean().required(),
  }),
}

export default function InlineRegisterForm() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)
  const { mutateAsync: register } = useRegister()
  const formik = useFormikContext<DonationFormData>()

  const values: IndividualRegisterFormData = {
    type: AccountType.INDIVIDUAL,
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
        formik.setFieldValue('authentication', DonationFormAuthState.AUTHENTICATED)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('auth:alerts.register-error'), 'error')
    }
  }

  return (
    <>
      <Grid container p={2} spacing={3} borderRadius={5} id={ids['registerEmail']}>
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
          {formik.values.registerPassword !== formik.values.registerConfirmPassword &&
            formik.touched.registerConfirmPassword && (
              <FormHelperText sx={{ color: 'red' }}>
                {t('validation:password-match')}
              </FormHelperText>
            )}
        </Grid>
        <Grid item xs={12}>
          <AcceptTermsField name="terms" />
          {!formik.values.registerTerms && formik.touched.registerTerms && (
            <FormHelperText sx={{ color: 'red' }}>{t('validation:terms-of-use')}</FormHelperText>
          )}
          <AcceptPrivacyPolicyField name="gdpr" />
          {!formik.values.registerGdpr && formik.touched.registerGdpr && (
            <FormHelperText sx={{ color: 'red' }}>
              {t('validation:terms-of-service')}
            </FormHelperText>
          )}
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
