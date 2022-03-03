import { AxiosResponse } from 'axios'

import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import {
  SupportRequestResponse,
  SupportRequestInput,
} from 'components/support-form/helpers/support-form.types'

export const createSupportRequest = async (data: SupportRequestInput) => {
  return await apiClient.post<SupportRequestInput, AxiosResponse<SupportRequestResponse>>(
    endpoints.support.createSupportRequest.url,
    data,
  )
}
