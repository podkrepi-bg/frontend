import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { CreateBeneficiaryInput, PersonResponse } from 'gql/person'

export const createBeneficiary = async (data: CreateBeneficiaryInput) => {
  return await apiClient.post<CreateBeneficiaryInput, AxiosResponse<PersonResponse>>(
    endpoints.beneficiary.createBeneficiary.url,
    data,
  )
}
