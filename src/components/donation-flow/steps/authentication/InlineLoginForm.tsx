import React, { useState } from 'react'
import * as yup from 'yup'
import { useTranslation } from 'next-i18next'
import { signIn } from 'next-auth/react'
import { useFormikContext } from 'formik'
import { Box, Button, CircularProgress, Grid } from '@mui/material'

import theme from 'common/theme'
import Google from 'common/icons/Google'
import PasswordField from 'components/common/form/PasswordField'
import EmailField from 'components/common/form/EmailField'
import { useDonationFlow } from 'components/donation-flow/DonationFlowContext'
import {
  DonationFormDataAuthState,
  DonationFormDataV2,
} from 'components/donation-flow/helpers/types'
import { AlertStore } from 'stores/AlertStore'

export const initialLoginFormValues = {
  loginEmail: '',
  loginPassword: '',
}

export const loginValidation = {
  loginEmail: yup.string().when('authentication', {
    is: DonationFormDataAuthState.LOGIN,
    then: yup.string().email('one-time-donation:errors-fields.email').required(),
  }),
  loginPassword: yup.string().when('authentication', {
    is: DonationFormDataAuthState.LOGIN,
    then: yup.string().required(),
  }),
}
function InlineLoginForm() {
  const { t } = useTranslation('one-time-donation')
  const [loading, setLoading] = useState(false)
  const { values, setFieldValue } = useFormikContext<DonationFormDataV2>()
  const { campaign } = useDonationFlow()
  const onGoogleLogin = () => {
    signIn('google', { callbackUrl: `campaigns/donation-v2/${campaign?.slug}` })
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
    <Grid p={2} container rowSpacing={3}>
      <Grid item xs={12}>
        <EmailField name="loginEmail" label="Email" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          name="loginPassword"
          type="password"
          label={t('second-step.password')}
          fullWidth
        />
      </Grid>
      <Button
        color="primary"
        variant="contained"
        fullWidth
        sx={{ marginTop: theme.spacing(3) }}
        onClick={onClick}>
        {loading ? <CircularProgress color="inherit" size="1.5rem" /> : t('second-step.btn-login')}
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
    </Grid>
  )
}

export default InlineLoginForm
