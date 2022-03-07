import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import axios from 'axios'
import { endpoints } from 'components/bootcamp/survices/requester'
import EditPage from 'components/bootcamp/Edit'
import { queryFn } from 'service/restRequests'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()

  const { data: values } = await axios.get(endpoints.bootcamp.viewTask(id as string).url)
  await client.prefetchQuery(`/bootcamp/${id}`, queryFn)
  return {
    props: {
      values,
      id,
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'bootcamp',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
