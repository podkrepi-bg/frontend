import { useQuery } from 'react-query'

import { endpoints } from 'common/api-endpoints'
import { PersonFormData } from 'gql/person'

export function usePersonList() {
  return useQuery<PersonFormData[]>(endpoints.person.list.url)
}

export function useViewPerson(slug: string) {
  return useQuery<PersonFormData>(endpoints.person.viewPerson(slug).url)
}

export function useDeleteCampaignType(slug: string) {
  return useQuery<PersonFormData>(endpoints.campaignTypes.deleteCampaignType(slug).url)
}
