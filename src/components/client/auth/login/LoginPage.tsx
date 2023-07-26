import React, { useEffect } from 'react'

import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'

import LoginForm from './LoginForm'
import { useSession } from 'next-auth/react'

export default function LoginPage() {
  const { t } = useTranslation()
  const session = useSession()

  //As google login is now on popup, we need to reload the page manually
  useEffect(() => {
    if (session.status === 'authenticated') {
      window.location.reload()
    }
  }, [session])

  return (
    <Layout title={t('auth:cta.login')} metaDescription={t('auth:cta.login')}>
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </Layout>
  )
}
