import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { BootcampResponse, BootcampTypeFormData } from 'gql/bootcamp'
import { useQuery } from 'react-query'
import { useKeycloak } from '@react-keycloak/ssr'
import { KeycloakInstance } from 'keycloak-js'
import { authQueryFnFactory } from './restRequests'

export const createBootcamp = async (data: BootcampTypeFormData) => {
  return await apiClient.post<BootcampTypeFormData, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.createOne.url,
    data,
  )
}

export const getAllBootcamp = async () => {
  return await apiClient.get<BootcampTypeFormData, AxiosResponse<BootcampResponse>>(
    endpoints.bootcamp.getAll.url,
  )
}
