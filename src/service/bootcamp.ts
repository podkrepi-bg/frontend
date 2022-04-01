import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BootcampResponse, BootcampTypeFormData } from 'gql/bootcamp'

export const createBootcamp = async (data: BootcampTypeFormData) => {
  return await apiClient.post<BootcampTypeFormData, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.createOne.url,
    data,
  )
}
