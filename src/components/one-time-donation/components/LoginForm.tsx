import { Box, Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'
import theme from 'common/theme'
import CheckboxField from 'components/common/form/CheckboxField'
import FormTextField from 'components/common/form/FormTextField'
import Link from 'components/common/Link'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Google from 'common/icons/Google'

function LoginForm() {
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography fontWeight={'bold'} fontSize={18}>
            {t('second-step.login')}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormTextField name="mail" type="text" label="Email" fullWidth size="medium" />
        </Grid>
        <Grid item xs={12}>
          <FormTextField
            name="password"
            type="text"
            label={t('second-step.password')}
            fullWidth
            size="medium"
          />
        </Grid>
        <Box display={'flex'} justifyContent="space-between" width="100%" alignItems="center">
          <FormControlLabel control={<Checkbox />} label="Remember" />
          <Box sx={{ opacity: 0.85 }}>
            <Typography display="inline" color="GrayText">
              Don&apos;t have an account?
            </Typography>{' '}
            <Link color={theme.palette.primary.dark} href="#">
              Sign up
            </Link>
          </Box>
        </Box>
      </Grid>
      <Button color="info" variant="contained" fullWidth sx={{ marginTop: theme.spacing(3) }}>
        {t('second-step.btn-login')}
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
  )
}

export default LoginForm
