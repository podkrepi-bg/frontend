import React, { useState } from 'react'
import Layout from 'components/layout/Layout'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

export default function ForgottenPasswordPage() {
  const [email, setEmail] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Layout>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Forgotten password?
        </Typography>
        <form onSubmit={handleSubmit}>
          <Typography paragraph>
            To reset your password, please type your email address below. We will then send you an
            email with instructions to follow.
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                label="Email"
                name="email"
                size="small"
                variant="outlined"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" color="primary" variant="contained">
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
