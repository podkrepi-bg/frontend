import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BenefactorInput, BenefactorResponse } from 'gql/benefactor'

export const createBenefactor = async (data: BenefactorInput) => {
  return await apiClient.post<BenefactorInput, AxiosResponse<BenefactorResponse>>(
    endpoints.benefactor.createBenefactor.url,
    data,
  )
}

export const getBenefactor = async (id: string) => {
  return await apiClient.get<string, AxiosResponse<BenefactorResponse>>(
    endpoints.benefactor.getBenefactor(id).url,
  )
}

export const editBenefactor = async ({ id, data }: { id: string; data: BenefactorInput }) => {
  return await apiClient.patch<BenefactorResponse, AxiosResponse<BenefactorResponse>>(
    endpoints.benefactor.editBenefactor(id).url,
    data,
  )
}

export const deleteBenefactor = async (id: string) => {
  return await apiClient.delete<string, AxiosResponse<BenefactorResponse>>(
    endpoints.benefactor.deleteBenefactor(id).url,
  )
}
