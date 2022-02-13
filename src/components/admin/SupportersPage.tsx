import React from 'react'
import { Container, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import Layout from 'components/layout/Layout'
import SupportersGrid from './SupportersGrid'

export default function SupportersPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h3">{t('nav.admin.supporters')}</Typography>
        <SupportersGrid />
      </Container>
    </Layout>
  )
}
