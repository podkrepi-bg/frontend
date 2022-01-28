import axios from 'axios'

import CountriesList from 'components/countries/CountriesList'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export type CountryType = {
  id: string
  name: string
  countryCode: string
}

export default function CountriesPage(props: { countries: CountryType[] }) {
  return <CountriesList countries={props.countries} />
}

export const getStaticProps: GetStaticProps = async ({
  locale,
}): Promise<{
  props: {
    countries: CountryType[]
  }
}> => {
  const { data } = await axios.get<CountryType[]>('http://localhost:5010/api/countries')

  return {
    props: {
      countries: data,
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
    },
  }
}
