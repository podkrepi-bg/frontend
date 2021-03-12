import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import SupportForm from './SupportForm'

export default function SupportPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('common:support-form.title')}>
      <Container maxWidth="lg">
        <SupportForm />
      </Container>
    </Layout>
  )
}
