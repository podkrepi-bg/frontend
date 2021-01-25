import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

import Layout from 'components/layout/Layout'

export default function ForgottenPasswordPage() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Layout title={t('nav.forgottenPassword')}>
      <Container maxWidth="xs">
        <form onSubmit={handleSubmit}>
          <Typography variant="body1" paragraph>
            {t('auth:pages.forgotten-password.instructions')}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label={t('auth:fields.email')}
                name="email"
                size="small"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" color="primary" variant="contained">
                {t('auth:cta.send')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
