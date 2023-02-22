import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/client/layout/Layout'

import SupportUsForm from './SupportUsForm'

export default function SupportPage() {
  const { t } = useTranslation()
  return (
    <Layout title={t('support_us:title')}>
      <Container maxWidth="lg">
        <SupportUsForm />
      </Container>
    </Layout>
  )
}
