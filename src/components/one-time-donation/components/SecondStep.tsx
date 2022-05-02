import { Grid } from '@mui/material'
import React from 'react'
import AnonymousMenu from './AnonymousMenu'
import { useTranslation } from 'next-i18next'
import LoginForm from './LoginForm'

export default function SecondStep() {
  const { t } = useTranslation('one-time-donation')
  return (
    <Grid>
      <LoginForm />
      <AnonymousMenu />
    </Grid>
  )
}
