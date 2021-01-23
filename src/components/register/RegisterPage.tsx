import React, { useState } from 'react'
import Layout from 'components/layout/Layout'
import { Typography, Container, Grid, TextField, Button } from '@material-ui/core'

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
  }

  return (
    <Layout>
      <Container maxWidth="xs">
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                fullWidth
                label="First Name"
                name="firstName"
                size="small"
                variant="outlined"
                autoFocus
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                fullWidth
                label="Last Name"
                name="lastName"
                size="small"
                variant="outlined"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Grid>
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
              <Button type="submit" fullWidth color="primary" variant="contained">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  )
}
