import React, { useState } from 'react'
import Layout from 'components/layout/Layout'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

export default function ChangePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Layout>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Change your password
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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
              <TextField
                type="password"
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                size="small"
                variant="outlined"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" fullWidth color="primary" variant="contained">
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
