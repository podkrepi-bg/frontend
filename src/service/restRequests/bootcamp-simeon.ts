import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BootcampSimeonResponse, BootcampSimeonInput } from 'gql/bootcampSimeon'
import { AxiosResponse } from 'axios'

export const getBootcampSimeonList = async () => {
  return apiClient.get<null, AxiosResponse<BootcampSimeonResponse[]>>(
    endpoints.bootcampSimeon.listAll.url,
  )
}

export const getBootcampSimeon = async (id: string) => {
  return apiClient.get<string, AxiosResponse<BootcampSimeonResponse>>(
    endpoints.bootcampSimeon.viewSingle(id).url,
  )
}

export const createBootcampSimeon = async (data: BootcampSimeonInput) => {
  return await apiClient.post<BootcampSimeonInput, AxiosResponse<BootcampSimeonResponse>>(
    endpoints.bootcampSimeon.create.url,
    data,
  )
}

export const updateBootcampSimeon = async (id: string, data: BootcampSimeonInput) => {
  return await apiClient.patch<string, AxiosResponse<BootcampSimeonResponse>>(
    endpoints.bootcampSimeon.edit(id).url,
    data,
  )
}

export const deleteBootcampSimeon = async (id: string) => {
  return await apiClient.delete(endpoints.bootcampSimeon.delete(id).url)
}
