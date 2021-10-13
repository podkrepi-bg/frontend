import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SupportersPage from 'components/admin/SupportersPage'
import { prefetchSupportRequestList } from 'common/hooks/supportRequest'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await prefetchSupportRequestList(client)
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'auth', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default SupportersPage
