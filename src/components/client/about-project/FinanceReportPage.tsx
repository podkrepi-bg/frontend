import React from 'react'

import { useTranslation } from 'next-i18next'

import { Container, Typography } from '@mui/material'
import FileDownloadIcon from '@mui/icons-material/FileDownload'

import Layout from 'components/client/layout/Layout'
import LinkButton from 'components/common/LinkButton'

export default function FinanceReportPage() {
  const { t } = useTranslation('about-project')

  return (
    <Layout title={t('finance-report-page.financeReport')} metaDescription={t('financeReport')}>
      <Container>
        <Typography>{t('finance-report-page.finance-report-2021')}</Typography>
        <LinkButton
          locale={false} // shows BG translation of finance report only for now
          endIcon={<FileDownloadIcon />}
          href="/finance-reports/Podkrepi.bg_Financial_Report_2021.pdf">
          {t('finance-report-page.download-from-here')}
        </LinkButton>
      </Container>
      <Container>
        <Typography>{t('finance-report-page.finance-report-2022')}</Typography>
        <LinkButton
          locale={false} // shows BG translation of finance report only for now
          endIcon={<FileDownloadIcon />}
          href="/finance-reports/Podkrepi.bg_Financial_Report_062022.pdf">
          {t('finance-report-page.download-from-here')}
        </LinkButton>
      </Container>
    </Layout>
  )
}
