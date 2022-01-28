import { GetServerSideProps } from 'next'
import CreateBootcampInternPage from 'components/bootcamp-interns/createPage/CreateBootcampInternPage'
import { dehydrate, QueryClient } from 'react-query'
import { queryFn } from 'common/rest'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()
  await client.prefetchQuery('/bootcamp-intern', queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'validation'])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default CreateBootcampInternPage
