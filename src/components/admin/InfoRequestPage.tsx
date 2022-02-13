import React from 'react'
import { Container, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Layout from 'components/layout/Layout'

import InfoRequestGrid from './InfoRequestGrid'

export default function InfoRequestPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h3">{t('nav.admin.info-requests')}</Typography>
        <InfoRequestGrid />
      </Container>
    </Layout>
  )
}
