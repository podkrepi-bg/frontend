import { prefetchCoordinatorList } from 'common/hooks/coordinators'
import { QueryClient, dehydrate } from 'react-query'
import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CordinatorsPage from 'components/admin/coordinator/CordinatorsPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/coordinator/list', queryFn)
  prefetchCoordinatorList(client)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CordinatorsPage
