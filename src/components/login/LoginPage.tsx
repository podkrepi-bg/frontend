import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button, Box } from '@material-ui/core'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import Link from 'components/shared/Link'
import { AlertStore } from 'stores/AlertStore'

export default function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }
  function showAlert() {
    AlertStore.show(t('auth:alerts.invalid-login'), 'error')
  }

  return (
    <Layout title={t('nav.login')}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label={t('auth:fields.email')}
                name="email"
                size="small"
                variant="outlined"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                fullWidth
                label={t('auth:fields.password')}
                name="password"
                size="small"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                onClick={() => showAlert()}>
                {t('auth:cta.login')}
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="flex-end">
          <Box mt={2}>
            <Link href={routes.forgottenPassword}>{t('nav.forgottenPassword')}</Link>
          </Box>
        </Grid>
      </Container>
    </Layout>
  )
}
