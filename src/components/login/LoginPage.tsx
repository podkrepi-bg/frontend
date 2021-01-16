import React, { useState } from 'react'
import Layout from 'components/layout/Layout'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
  }

  return (
    <Layout>
      <Container maxWidth="xs">
        <Typography align="center" variant="h5" color="primary" paragraph={true}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
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
      </Container>
    </Layout>
  )
}
