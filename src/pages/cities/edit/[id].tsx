import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import EditCityPage from 'components/cities/CityEditForm'
import { queryFn } from 'common/rest'
import { axios } from 'common/api-client'
import { endpoints } from 'common/api-endpoints'

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { id } = query
  const client = new QueryClient()

  const { data: values } = await axios.get(endpoints.city.viewCity(String(id)).url)
  await client.prefetchQuery(`/city/list-one/${id}`, queryFn)
  return {
    props: {
      values,
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

export default EditCityPage
