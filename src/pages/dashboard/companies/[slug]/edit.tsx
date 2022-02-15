import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { QueryClient, dehydrate } from 'react-query'

import { keycloakInstance } from 'middleware/auth/keycloak'
import { prefetchCompanyById, useCompanyById } from 'common/hooks/companies'
import CreateCompanyForm from 'components/companies/CreateCompanyForm'
import DashboardLayout from 'components/layout/DashboardLayout'

type Props = {
  slug: string
}

export default function EditPage({ slug }: Props) {
  const { data } = useCompanyById(slug)

  return (
    <DashboardLayout>
      <CreateCompanyForm initialValues={data} />
    </DashboardLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { slug } = ctx.query
  const keycloak = keycloakInstance(ctx)
  const client = new QueryClient()
  await prefetchCompanyById(client, slug as string, keycloak.token)

  return {
    props: {
      slug,
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'validation', 'companies'])),
      dehydratedState: dehydrate(client),
    },
  }
}
