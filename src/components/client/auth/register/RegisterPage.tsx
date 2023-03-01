import React from 'react'

import { signIn } from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import { Box, Button, Container, Grid } from '@mui/material'

import { baseUrl } from 'common/routes'
import type { RegisterPageProps } from 'pages/register'
import Layout from 'components/client/layout/Layout'

import RegisterForm from './RegisterForm'

export default function RegisterPage({ providers }: RegisterPageProps) {
  const { t } = useTranslation()

  return (
    <Layout title={t('auth:cta.register')} metaDescription={t('auth:cta.register')}>
      <Container maxWidth="sm">
        <RegisterForm />
        <Box mt={4}>
          <Grid container direction="column" spacing={1}>
            {providers &&
              Object.values(providers)
                .filter((p) => p.id !== 'credentials')
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
