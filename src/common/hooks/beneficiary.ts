import { useQuery } from 'react-query'

import { endpoints } from 'service/apiEndpoints'
import { PersonFormData } from 'gql/person'

export function useBeneficiariesList() {
  return useQuery<PersonFormData[]>(endpoints.beneficiary.listBeneficiary.url)
}

export function useViewBeneficiary(slug: string) {
  return useQuery<PersonFormData>(endpoints.beneficiary.viewBeneficiary(slug).url)
}

export function useDeleteBeneficiary(slug: string) {
  return useQuery<PersonFormData>(endpoints.beneficiary.removeBeneficiary(slug).url)
}
