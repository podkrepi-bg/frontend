import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'
import ForgottenPasswordForm from 'components/client/auth/forgottenPassword/ForgottenPasswordForm'

export default function ForgottenPasswordPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.forgottenPassword')}>
      <Container maxWidth="xs">
        <ForgottenPasswordForm />
      </Container>
    </Layout>
  )
}
