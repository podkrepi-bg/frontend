import { queryFn } from 'common/rest'
import { GetServerSideProps } from 'next'
import { QueryClient, dehydrate } from 'react-query'
import { prefetchBootcampInternsList } from 'common/hooks/bootcampIntern'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import BootcampInternPage from 'components/bootcamp-interns/BootcampInternPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp-intern', queryFn)
  prefetchBootcampInternsList(client)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampInternPage
