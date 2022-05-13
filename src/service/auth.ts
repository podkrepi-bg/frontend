import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { Person } from 'gql/person'

type RegisterResponse = Person
type RegisterInput = {
  email: string
  password: string
}

export const register = async (data: RegisterInput) => {
  return await apiClient.post<RegisterInput, AxiosResponse<RegisterResponse>>(
    endpoints.auth.register.url,
    data,
  )
}

export function useRegister() {
  return useMutation<AxiosResponse<RegisterResponse>, unknown, RegisterInput>(
    endpoints.auth.register.url,
    { mutationFn: register },
  )
}
