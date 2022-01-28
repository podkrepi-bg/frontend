import CreateCountry from 'components/countries/CreateCountry'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export default function CreateCountryPage() {
  return <CreateCountry />
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'bg', ['common'])),
    },
  }
}
