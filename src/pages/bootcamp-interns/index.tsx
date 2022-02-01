import { GetServerSideProps } from 'next'
import BootcampInternPage from 'components/bootcamp-interns/BootcampInternPage'
import { QueryClient, dehydrate } from 'react-query'
import { queryFn } from 'common/rest'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { prefetchBootcampInternsList } from 'common/hooks/bootcampIntern'

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
