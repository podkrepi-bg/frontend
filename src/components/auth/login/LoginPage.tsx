import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Box } from '@material-ui/core'

import { routes } from 'common/routes'
import Link from 'components/common/Link'
import Layout from 'components/layout/Layout'
import LoginForm from 'components/auth/login/LoginForm'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.login')}>
      <Container maxWidth="xs">
        <LoginForm />
        <Grid container justify="flex-end">
          <Box mt={2}>
            <Link href={routes.forgottenPassword}>{t('nav.forgottenPassword')}</Link>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
