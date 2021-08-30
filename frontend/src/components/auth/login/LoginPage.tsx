import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Grid, Box } from '@material-ui/core'

import { routes } from 'common/routes'
import Link from 'components/common/Link'
import { LoginPageProps } from 'pages/login'
import Layout from 'components/layout/Layout'
import LoginForm from 'components/auth/login/LoginForm'

export default function LoginPage({ csrfToken }: LoginPageProps) {
  const { t } = useTranslation()
  return (
    <Layout title={t('nav.login')}>
      <Container maxWidth="xs">
        <LoginForm csrfToken={csrfToken || ''} />
        <Grid container justify="flex-end">
          <Box mt={2}>
            <Link href={routes.forgottenPassword}>{t('nav.forgottenPassword')}</Link>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
