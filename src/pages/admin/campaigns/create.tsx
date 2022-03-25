import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CreateCampaignPageGrid from 'components/campaigns/grid/CreatePage'

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

export default CreateCampaignPageGrid
