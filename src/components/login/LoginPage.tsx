import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Grid, TextField, Button } from '@material-ui/core'

import { routes } from 'common/routes'
import Layout from 'components/layout/Layout'
import Link from 'components/shared/Link'

import styles from './login.module.scss'

export default function LoginPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Layout title={t('nav.login')}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit} className={styles.form}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Email"
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
                label="Password"
                name="password"
                size="small"
                variant="outlined"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" color="primary" variant="contained">
                Log in
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="flex-end">
          <Link href={routes.forgottenPassword}>Forgotten password?</Link>
        </Grid>
      </Container>
    </Layout>
  )
}
