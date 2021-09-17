import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CampaignPage from 'components/campaigns/CampaignPage'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'bg', [
      'common',
      'auth',
      'validation',
      'campaigns',
    ])),
  },
})

export default CampaignPage
