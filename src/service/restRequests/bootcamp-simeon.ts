import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BootcampSimeonResponse, BootcampSimeonInput } from 'gql/bootcampSimeon'
import { AxiosResponse } from 'axios'

export const createBootcampSimeon = async (data: BootcampSimeonInput) => {
  return await apiClient.post<BootcampSimeonInput, AxiosResponse<BootcampSimeonResponse>>(
    endpoints.bootcampSimeon.create.url,
    data,
  )
}

export const editBootcampSimeon = async (id: string, data: BootcampSimeonInput) => {
  return await apiClient.patch<string, AxiosResponse<BootcampSimeonResponse>>(
    endpoints.bootcampSimeon.edit(id).url,
    data,
  )
}

export const deleteBootcampSimeon = async (id: string) => {
  return await apiClient.delete(endpoints.bootcampSimeon.delete(id).url)
}
