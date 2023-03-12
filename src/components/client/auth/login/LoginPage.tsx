import React from 'react'

import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'

import LoginForm from './LoginForm'

export default function LoginPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('auth:cta.login')} metaDescription={t('auth:cta.login')}>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Layout>
  )
}
