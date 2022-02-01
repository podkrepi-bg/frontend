import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import BootcampInternEditPage from 'components/bootcamp-interns/editPage/EditBootcampInternPage'
import { queryFn } from 'common/rest'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query // get the id from the query
  const client = new QueryClient() // creating a client

  // const { data: intern } = await axios.get(
  //   endpoints.bootcampIntern.listBootcampIntern.url + '/' + id,
  // )
  await client.prefetchQuery(`/bootcamp-intern/${id}`, queryFn) // prefecthing and caching a query
  return {
    props: {
      id,
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default BootcampInternEditPage
