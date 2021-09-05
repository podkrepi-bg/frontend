import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import CampaignsPage from 'components/campaigns/CampaignsPage'
import { addApolloState, createApolloClient } from 'gql/apollo-client'
import { ListCampaign, ListCampaigns } from 'gql/query/campaigns/ListCampaigns'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const client = createApolloClient()
  await client.query<ListCampaign>({ query: ListCampaigns })
  return {
    props: addApolloState(client, {
      ...(await serverSideTranslations(locale ?? 'bg', [
        'common',
        'auth',
        'validation',
        'campaigns',
      ])),
    }),
  }
}

export default CampaignsPage
