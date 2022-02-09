import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import CreatePage from 'components/documents/CreatePage'
import { endpoints } from 'common/api-endpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = new QueryClient()

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

export default CreatePage
