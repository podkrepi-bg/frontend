// import { GetServerSideProps } from 'next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

// import EditBootcampPage from 'components/bootcamps/EditBootcampPage'

// export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? 'bg', [
//       'common',
//       'auth',
//       'validation',
//       'campaigns',
//     ])),
//   },
// })

// export default EditBootcampPage

import { GetServerSideProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryFn } from 'common/rest'
import ViewBootcampPage from 'components/bootcamps/ViewBootcampPage'
import EditBootcampPage from 'components/bootcamps/EditBootcampPage'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { id } = query
  const client = new QueryClient()
  await client.prefetchQuery(`/bootcamp/update-one/${id}`, queryFn)
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
export default EditBootcampPage

