import { GetStaticProps } from 'next'
import { axios } from 'common/api-client'

import CreateCountry from 'components/countries/CreateCountry'

import { CountryType } from '..'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function EditCountryPage(props: { country: CountryType }) {
  return <CreateCountry initialValues={props.country} />
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const countryId = params?.countryId

  const { data } = await axios.get<CountryType>('http://localhost:5010/api/countries/' + countryId)

  return {
    props: {
      country: data,
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
    },
  }
}

export async function getStaticPaths() {
  const { data } = await axios.get<CountryType[]>('http://localhost:5010/api/countries')

  return {
    fallback: false,
    paths: data.map((x) => ({
      params: { countryId: x.id.toString() },
    })),
  }
}
