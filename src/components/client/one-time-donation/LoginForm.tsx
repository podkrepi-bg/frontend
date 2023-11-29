import React, { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { signIn } from 'next-auth/react'
import { OneTimeDonation } from 'gql/donations'
import { useFormikContext } from 'formik'

import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'

import theme from 'common/theme'
import Google from 'common/icons/Google'
import { routes } from 'common/routes'
import EmailField from 'components/common/form/EmailField'
import PasswordField from 'components/common/form/PasswordField'
import LinkButton from 'components/common/LinkButton'
import { StepsContext } from './helpers/stepperContext'
import { AlertStore } from 'stores/AlertStore'
import { useCurrentPerson } from 'common/util/useCurrentPerson'

const onGoogleLogin = () => signIn('google')

function LoginForm() {
  const { t } = useTranslation('one-time-donation')
  const [loading, setLoading] = useState(false)
  const { setStep } = useContext(StepsContext)
  const formik = useFormikContext<OneTimeDonation>()
  const { refetch } = useCurrentPerson()

  const onClick = async () => {
    try {
      setLoading(true)

      const resp = await signIn<'credentials'>('credentials', {
        email: formik.values.loginEmail,
        password: formik.values.loginPassword,
        redirect: false,
      })
      if (resp?.error) {
        throw new Error(resp.error)
      }
      if (resp?.ok) {
        refetch()
        setLoading(false)
        formik.setFieldValue('isAnonymous', false)
        setStep(2)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    }
  }
  return (
    <Grid sx={{ marginBottom: theme.spacing(4) }} container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="subtitle2" fontWeight="bold">
          {t('second-step.login')}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <EmailField name="loginEmail" label="Email" fullWidth size="medium" />
      </Grid>
      <Grid item xs={12}>
        <PasswordField
          name="loginPassword"
          type="password"
          label={t('second-step.password')}
          fullWidth
          size="medium"
        />
      </Grid>
      <Grid container justifyContent="flex-end">
        <LinkButton href={routes.forgottenPassword}>
          {t('auth:account.forgotten-password')}
        </LinkButton>
      </Grid>
      <Button
        size="large"
        color="primary"
        variant="contained"
        fullWidth
        sx={{ marginTop: theme.spacing(3) }}
        onClick={onClick}>
        {loading ? <CircularProgress color="inherit" size="1.5rem" /> : t('second-step.btn-login')}
      </Button>
      <Button
        size="large"
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

export default LoginForm
