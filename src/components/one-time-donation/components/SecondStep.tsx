import { Grid } from '@mui/material'
import React from 'react'
import AnonymousMenu from './AnonymousForm'
import LoginForm from './LoginForm'

export default function SecondStep() {
  return (
    <Grid>
      <LoginForm />
      <AnonymousMenu />
    </Grid>
  )
}
