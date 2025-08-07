import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { signIn } from 'next-auth/react'
import { useFormikContext } from 'formik'
import { Box, Button, CircularProgress, Grid2 } from '@mui/material'

import theme from 'common/theme'
import Google from 'common/icons/Google'
import PasswordField from 'components/common/form/PasswordField'
import EmailField from 'components/common/form/EmailField'
import { useDonationFlow } from 'components/client/donation-flow/contexts/DonationFlowProvider'
import {
  DonationFormAuthState,
  DonationFormData,
} from 'components/client/donation-flow/helpers/types'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import { ids } from '../../common/DonationFormSections'

export const initialLoginFormValues = {
  loginEmail: '',
  loginPassword: '',
}

export const loginValidation = {
  loginEmail: yup.string().when('authentication', {
    is: DonationFormAuthState.LOGIN,
    then: yup.string().email('donation-flow:general.error.email').required(),
  }),
  loginPassword: yup.string().when('authentication', {
    is: DonationFormAuthState.LOGIN,
    then: yup.string().required(),
  }),
}
function InlineLoginForm() {
  const { t } = useTranslation('donation-flow')
  const [loading, setLoading] = useState(false)
  const { values, setFieldValue } = useFormikContext<DonationFormData>()
  const { campaign } = useDonationFlow()
  const onGoogleLogin = () => {
    signIn('google', { callbackUrl: routes.campaigns.oneTimeDonation(campaign.slug) })
  }

  const onClick = async () => {
    try {
      setLoading(true)

      const resp = await signIn<'credentials'>('credentials', {
        email: values.loginEmail,
        password: values.loginPassword,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        setLoading(false)
        setFieldValue('isAnonymous', false)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
      }
    } catch (error) {
      setLoading(false)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    }
  }
  return (
    <Grid2 p={2} container rowSpacing={3} id={ids['loginEmail']}>
      <Grid2 size={12}>
        <EmailField name="loginEmail" label="Email" fullWidth />
      </Grid2>
      <Grid2 size={12}>
        <PasswordField
          name="loginPassword"
          type="password"
          label={t('step.authentication.field.password')}
          fullWidth
        />
      </Grid2>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        sx={{ marginTop: theme.spacing(3) }}
        onClick={onClick}>
        {loading ? (
          <CircularProgress color="inherit" size="1.5rem" />
        ) : (
          t('step.authentication.login.label')
        )}
      </Button>
      <Button
        color="primary"
        variant="outlined"
        fullWidth
        sx={{ marginTop: theme.spacing(3) }}
        onClick={onGoogleLogin}>
        <Box display="inline-flex" alignItems="center" marginRight={theme.spacing(2)}>
          <Google /> {t('common:nav.login-with')} Google
        </Box>
      </Button>
    </Grid2>
  );
}

export default InlineLoginForm
