import React from 'react'

import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Box, Button, Container, Grid } from '@mui/material'

import { baseUrl } from 'common/routes'
import type { LoginPageProps } from 'pages/login'
import Layout from 'components/layout/Layout'

import LoginForm from './LoginForm'

export default function LoginPage({ providers }: LoginPageProps) {
  const { t } = useTranslation()

  return (
    <Layout title={t('auth:cta.login')} metaDescription={t('auth:cta.login')}>
      <Container maxWidth="sm">
        <LoginForm />
        <Box mt={4}>
          <Grid container direction="column" spacing={1}>
            {providers &&
              Object.values(providers)
                .filter((p) => p.name !== 'Credentials')
                .map((provider) => (
                  <Grid item key={provider.name}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => signIn(provider.id, { callbackUrl: baseUrl })}>
                      {t('nav.login-with')} {provider.name}
                    </Button>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Container>
    </Layout>
  )
}
