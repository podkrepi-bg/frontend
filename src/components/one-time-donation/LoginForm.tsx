import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useFormikContext } from 'formik'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Collapse,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'
import theme from 'common/theme'
import Google from 'common/icons/Google'
import { OneTimeDonation } from 'gql/donations'
import FormTextField from 'components/common/form/FormTextField'
import { signIn } from 'next-auth/react'
import { StepsContext } from './helpers/stepperContext'
import { AlertStore } from 'stores/AlertStore'
import RegisterDialog from './RegisterDialog'
import PasswordField from 'components/common/form/PasswordField'

function LoginForm() {
  const { t } = useTranslation('one-time-donation')
  const [isLogedin, setIsLogedin] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setStep } = useContext(StepsContext)
  const formik = useFormikContext<OneTimeDonation>()

  useEffect(() => {
    isLogedin ? setStep(2) : null
  }, [isLogedin])
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
        setLoading(false)

        setIsLogedin(true)
        AlertStore.show(t('auth:alerts.welcome'), 'success')
      }
    } catch (error) {
      console.error(error)
      AlertStore.show(t('auth:alerts.invalid-login'), 'error')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Collapse in={!formik.values.anonymousDonation && !isLogedin} timeout="auto">
      <Grid sx={{ marginBottom: theme.spacing(4) }} container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'} fontSize={16} color="#343434">
            {t('second-step.login')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField name="loginEmail" type="text" label="Email" fullWidth size="medium" />
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
        <Box display={'flex'} justifyContent="space-between" width="100%" alignItems="center">
          <FormControlLabel
            control={<Checkbox />}
            label={t('second-step.checkbox-label') as string}
          />
          <Box sx={{ opacity: 0.85 }}>
            <Typography display="inline" color="GrayText">
              Don&apos;t have an account?
            </Typography>{' '}
            <RegisterDialog />
          </Box>
        </Box>
        <Button
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          sx={{ marginTop: theme.spacing(3) }}
          onClick={onClick}>
          {loading ? (
            <CircularProgress color="inherit" size="1.5rem" />
          ) : (
            t('second-step.btn-login')
          )}
        </Button>
        <Button
          size="large"
          color="primary"
          variant="outlined"
          fullWidth
          sx={{ marginTop: theme.spacing(3) }}>
          <Box display="inline-flex" alignItems="center" marginRight={theme.spacing(2)}>
            <Google />
          </Box>
          Log in with Google
        </Button>
      </Grid>
    </Collapse>
  )
}

export default LoginForm
