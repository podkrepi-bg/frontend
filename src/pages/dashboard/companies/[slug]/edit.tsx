import { GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { useCompanyById } from 'common/hooks/companies'
import { queryFn } from 'common/rest'
import CreateCompanyForm from 'components/companies/CreateCompanyForm'
import DashboardLayout from 'components/layout/DashboardLayout'

type Props = {
  slug: string
}

export default function EditPage({ slug }: Props) {
  const { data } = useCompanyById(slug)
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t('companies:all')}>
      <CreateCompanyForm initialValues={data} />
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  const client = new QueryClient()
  await client.prefetchQuery(endpoints.company.editCompany(slug as string).url, queryFn)

  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation', 'companies'])),
      dehydratedState: dehydrate(client),
    },
  }
}
