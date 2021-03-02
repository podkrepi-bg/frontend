import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import RegisterForm from 'components/auth/register/RegisterForm'

export default function RegisterPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.register')}>
      <Container maxWidth="xs">
        <RegisterForm />
      </Container>
    </Layout>
  )
}
