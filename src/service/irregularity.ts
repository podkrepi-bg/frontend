import { AxiosResponse } from 'axios'

import { authConfig } from './restRequests'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'

import {
  IrregularityEditInput,
  IrregularityFileResponse,
  IrregularityInput,
  IrregularityResponse,
  IrregularityUploadImage,
  UploadIrregularityFiles,
} from 'components/client/irregularity/helpers/irregularity.types'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'

export const createIrregularity = async (data: IrregularityInput) => {
  return await apiClient.post<IrregularityInput, AxiosResponse<IrregularityResponse>>(
    endpoints.irregularity.createIrregularity.url,
    data,
  )
}

export const download = (id: string, session: Session | null) => {
  return apiClient(endpoints.irregularity.download(id).url, {
    ...authConfig(session?.accessToken),
    responseType: 'blob',
  })
}

export const editIrregularity = (id: string) => {
  const { data: session } = useSession()

  return async (data: IrregularityEditInput) => {
    return await apiClient.put<IrregularityEditInput, AxiosResponse<IrregularityResponse>>(
      endpoints.irregularity.editIrregularity(id).url,
      data,
      authConfig(session?.accessToken),
    )
  }
}

export const deleteIrregularity = (id: string) => {
  const { data: session } = useSession()

  return async () => {
    return await apiClient.delete<IrregularityResponse, AxiosResponse<IrregularityResponse>>(
      endpoints.irregularity.removeIrregularity(id).url,
      authConfig(session?.accessToken),
    )
  }
}

export const uploadIrregularityFiles = () => {
  const { data: session } = useSession()

  return async ({ files, irregularityId }: UploadIrregularityFiles) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<IrregularityUploadImage[]>>(
      endpoints.irregularityFile.uploadIrregularityFile(irregularityId).url,
      formData,
      {
        headers: {
          ...authConfig(session?.accessToken).headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    )
  }
}

export const deleteIrregularityFile = (id: string) => {
  const { data: session } = useSession()

  return async () => {
    return await apiClient.delete<
      IrregularityFileResponse,
      AxiosResponse<IrregularityFileResponse>
    >(endpoints.irregularityFile.deleteIrregularityFile(id).url, authConfig(session?.accessToken))
  }
}
