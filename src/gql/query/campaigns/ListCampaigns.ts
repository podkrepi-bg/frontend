import gql from 'graphql-tag'

import { Campaign } from 'gql/campaigns'

export type ListCampaign = { campaigns: Campaign[] }

export const ListCampaigns = gql`
  query ListCampaigns {
    campaigns {
      id
      title
      state
      currency
      shortDescription
      operatorId
      initiatorId
      initiatorId
      beneficiaryId
      campaignType {
        id
        name
      }
    }
  }
`
