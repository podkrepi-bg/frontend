import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CreateCompanyForm from 'components/companies/CreateCompanyForm'
import DashboardLayout from 'components/layout/DashboardLayout'

export default function CreateCompanyPage() {
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('companies:all')}>
      <CreateCompanyForm />
    </DashboardLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'validation',
        'companies',
        'cities',
      ])),
    },
  }
}
