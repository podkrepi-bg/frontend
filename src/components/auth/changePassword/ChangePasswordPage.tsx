import React from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'
import ChangePasswordForm from 'components/auth/changePassword/ChangePasswordForm'

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
