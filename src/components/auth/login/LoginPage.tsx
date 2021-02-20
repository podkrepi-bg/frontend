import React from 'react'
import { signIn } from 'next-auth/client'
import { useTranslation } from 'react-i18next'
import { Container, Grid, Box, Button } from '@material-ui/core'

import Link from 'components/common/Link'
import { LoginPageProps } from 'pages/login'
import Layout from 'components/layout/Layout'
import { routes, baseUrl } from 'common/routes'
import LoginForm from 'components/auth/login/LoginForm'

const callbackUrl = `${baseUrl}${routes.index}`

export default function LoginPage({ providers }: LoginPageProps) {
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
        <Box mt={4}>
          <Grid container direction="column" spacing={1}>
            {providers &&
              Object.values(providers).map((provider) => (
                <Grid item key={provider.name}>
                  <Button
                    fullWidth
                    color="default"
                    variant="outlined"
                    onClick={() => signIn(provider.id, { callbackUrl })}>
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
