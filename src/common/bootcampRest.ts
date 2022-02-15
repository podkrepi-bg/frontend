import { MutationFunction } from 'react-query'
import { AxiosResponse } from 'axios'

import { axios } from './api-client'
import { endpoints } from './api-endpoints'
import { BootcampEdit, BootcampInput, BootcampResponse } from 'gql/bootcamp'

export const createBootcamp: MutationFunction<AxiosResponse<BootcampResponse>, BootcampInput> =
  async (data: BootcampInput) => {
    return await axios.post<BootcampInput, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.createBootcamp.url,
      data,
    )
  }

export const getBootcamp: MutationFunction<AxiosResponse<BootcampResponse>, string> = async (
  id: string,
) => {
  return await axios.get<string, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.bootcampSingle(id).url,
  )
}

export const updateBootcampREST: MutationFunction<AxiosResponse<BootcampResponse>, BootcampEdit> =
  async (data: BootcampEdit) => {
    return await axios.patch<BootcampInput, AxiosResponse<BootcampResponse>>(
      endpoints.bootcamp.updateBootcamp(data.id).url,
      data,
    )
  }

export const deleteBootcampREST: MutationFunction<AxiosResponse<BootcampResponse>, string> = async (
  id: string,
) => {
  return await axios.delete<BootcampInput, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.deleteBootcamp(id).url,
  )
}
