import { prefetchInfoRequestList } from 'common/hooks/infoRequest'
import { queryFn } from 'common/rest'
import InfoRequestPage from 'components/admin/info-request/InfoRequestPage'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const client = new QueryClient()
  await client.prefetchQuery('/info-request/list', queryFn)
  prefetchInfoRequestList(client)

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale ?? 'bg', ['common', 'auth', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default InfoRequestPage
