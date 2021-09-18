import gql from 'graphql-tag'

import { Campaign } from 'gql/campaigns'

export type CreateCampaign = { campaigns: Campaign[] }

export const CreateCampaign = gql`
  mutation CreateCampaign($input: CreateCampaign!) {
    createCampaign(input: $input) {
      id
      title
      shortDescription
      state
    }
  }
`
