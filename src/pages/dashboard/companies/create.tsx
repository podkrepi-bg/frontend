import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CreateCompanyForm from 'components/companies/CreateCompanyForm'
import DashboardLayout from 'components/layout/DashboardLayout'

export default function CreateCompanyPage() {
  return (
    <DashboardLayout>
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
