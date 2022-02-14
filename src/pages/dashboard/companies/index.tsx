import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import DashboardLayout from 'components/layout/DashboardLayout'
import CompaniesGrid from 'components/companies/grid/CompaniesGrid'

export default function CompaniesPage() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('companies:all')}>
      <CompaniesGrid />
    </DashboardLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'companies'])),
    },
  }
}
