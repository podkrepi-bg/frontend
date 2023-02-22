import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'
import ChangePasswordForm from 'components/client/auth/changePassword/ChangePasswordForm'

export default function ChangePasswordPage() {
  const { t } = useTranslation()

  return (
    <Layout title={t('nav.changePassword')}>
      <Container maxWidth="xs">
        <ChangePasswordForm />
      </Container>
    </Layout>
  )
}
