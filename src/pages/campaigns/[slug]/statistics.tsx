import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import StatisticsPage from 'components/client/campaigns/StatisticsPage'

export const getServerSideProps: GetServerSideProps = async ({ query, locale }) => {
  const { slug } = query
  return {
    props: {
      slug,
      ...(await serverSideTranslations(locale ?? 'bg', ['common', 'campaigns'])),
    },
  }
}

export default StatisticsPage
