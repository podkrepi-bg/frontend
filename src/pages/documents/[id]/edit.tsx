import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import EditPage from 'components/documents/EditPage'
import { endpoints } from 'common/api-endpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()
  await client.prefetchQuery(`${endpoints.documents.getDocument.url}/${id}`, queryFn)

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'document',
        'validation',
      ])),
      dehydratedState: dehydrate(client),
    },
  }
}

export default EditPage
