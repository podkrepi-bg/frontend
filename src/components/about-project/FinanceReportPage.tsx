import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container, Typography } from '@mui/material'

import Layout from 'components/layout/Layout'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import LinkButton from 'components/common/LinkButton'

export default function FinanceReportPage() {
  const { t } = useTranslation()

  return (
    <Layout
      title={t('about-project:financeReport')}
      metaDescription={t('about-project:financeReport')}>
      <Container>
        <Typography>Финансов репорт за 2021:</Typography>
        <LinkButton
          endIcon={<FileDownloadIcon />}
          href="/finance-reports/Podkrepi.bg_Financial_Report_2021_1.pdf">
          Свалете от тук
        </LinkButton>
      </Container>
      <Container>
        <Typography>Финансов репорт за 2022 Януари-Юни:</Typography>
        <LinkButton
          endIcon={<FileDownloadIcon />}
          href="/finance-reports/Podkrepi.bg_Financial_Report_062022.pdf">
          Свалете от тук
        </LinkButton>
      </Container>
    </Layout>
  )
}
