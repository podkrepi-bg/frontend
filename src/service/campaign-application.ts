import { AxiosError, AxiosResponse, isAxiosError } from 'axios'
import { useSession } from 'next-auth/react'

import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CampaignApplicationExisting,
  CreateCampaignApplicationInput,
  CreateCampaignApplicationResponse,
  UploadCampaignApplicationFilesRequest,
  UploadCampaignApplicationFilesResponse,
} from 'gql/campaign-applications'
import { apiClient } from 'service/apiClient'
import { endpoints } from 'service/apiEndpoints'
import { authConfig, authQueryFnFactory } from 'service/restRequests'
import {
  CampaignApplicationFormData,
  CampaignEndTypes,
} from 'components/client/campaign-application/helpers/campaignApplication.types'
import { Person } from 'gql/person'
import { useState } from 'react'
import { ApiErrors } from './apiErrors'

export const useCreateCampaignApplication = () => {
  const { data: session } = useSession()
  return async (data: CreateCampaignApplicationInput) =>
    await apiClient.post<
      CreateCampaignApplicationInput,
      AxiosResponse<CreateCampaignApplicationResponse>
    >(endpoints.campaignApplication.create.url, data, authConfig(session?.accessToken))
}

export const useUploadCampaignApplicationFiles = () => {
  const { data: session } = useSession()
  return async ({ files, campaignApplicationId }: UploadCampaignApplicationFilesRequest) => {
    const formData = new FormData()
    files.forEach((file: File) => {
      formData.append('file', file)
    })
    return await apiClient.post<FormData, AxiosResponse<UploadCampaignApplicationFilesResponse>>(
      endpoints.campaignApplication.uploadFile(campaignApplicationId).url,
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

export const useDeleteCampaignApplicationFile = () => {
  const { data: session } = useSession()
  return async (id: string) =>
    await apiClient.delete<UploadCampaignApplicationFilesRequest>(
      endpoints.campaignApplication.deleteFile(id).url,
      authConfig(session?.accessToken),
    )
}

export function useViewCampaignApplicationCached(id: string, cacheFor = 60 * 1000) {
  const { data } = useSession()
  return useQuery<CampaignApplicationExisting, AxiosError>(
    [endpoints.campaignApplication.view(id).url],
    authQueryFnFactory<CampaignApplicationExisting>(data?.accessToken),
    {
      cacheTime: cacheFor,
    },
  )
}

export const useUpdateCampaignApplication = () => {
  const { data: session } = useSession()
  return async ([data, id]: [CreateCampaignApplicationInput, string]) =>
    await apiClient.patch<
      CreateCampaignApplicationInput,
      AxiosResponse<CreateCampaignApplicationResponse>
    >(endpoints.campaignApplication.update(id).url, data, authConfig(session?.accessToken))
}

export interface CreateOrEditApplication {
  person?: Person
  isEdit?: boolean
  campaignApplication?: CampaignApplicationExisting
}

export const useCreateOrEditApplication = ({
  person,
  isEdit,
  campaignApplication: existing,
}: CreateOrEditApplication) => {
  const initialValues: CampaignApplicationFormData = mapExistingOrNew(isEdit, existing, person)

  const [files, setFiles] = useState<File[]>(
    existing?.documents?.map((d) => ({ name: d.filename } as File)) ?? [],
  )
  const [submitting, setSubmitting] = useState(false)
  const [created, setCreated] = useState(false)
  const [error, setError] = useState<string[]>()
  const [uploadedFiles, setFileUploadState] = useState<Record<'successful' | 'failed', string[]>>({
    successful: [],
    failed: [],
  })
  const [deletedFiles, setFileDeletedState] = useState<Record<'successful' | 'failed', string[]>>({
    successful: [],
    failed: [],
  })
  const [campaignApplicationResult, setCampaignApplicationResult] =
    useState<CreateCampaignApplicationResponse>()

  const create = useMutation<
    AxiosResponse<CreateCampaignApplicationResponse>,
    AxiosError<ApiErrors>,
    CreateCampaignApplicationInput
  >({
    mutationFn: useCreateCampaignApplication(),
  })

  const fileUpload = useMutation<
    AxiosResponse<UploadCampaignApplicationFilesResponse>,
    AxiosError<ApiErrors>,
    UploadCampaignApplicationFilesRequest
  >({
    mutationFn: useUploadCampaignApplicationFiles(),
  })

  const fileDelete = useMutation({
    mutationFn: useDeleteCampaignApplicationFile(),
  })

  const update = useMutation<
    AxiosResponse<CreateCampaignApplicationResponse>,
    AxiosError<ApiErrors>,
    [CreateCampaignApplicationInput, string]
  >({
    mutationFn: useUpdateCampaignApplication(),
  })

  const createOrUpdateApplication = async (
    input: CreateCampaignApplicationInput,
    files: File[],
  ) => {
    setError(undefined)
    if (submitting) {
      return
    }
    setSubmitting(true)

    const dataOrError =
      isEdit && typeof existing?.id === 'string'
        ? await update.mutateAsync([input, existing?.id]).catch((e) => e as AxiosError<ApiErrors>)
        : await create.mutateAsync(input).catch((e) => e as AxiosError<ApiErrors>)

    if (isAxiosError(dataOrError)) {
      setSubmitting(false)
      if (typeof dataOrError.response?.data.message === 'string') {
        setError([dataOrError.response?.data.message])
      } else {
        setError(dataOrError.response?.data?.message?.flatMap((m) => Object.values(m.constraints)))
      }
      return
    }

    if (dataOrError?.data?.id == null) {
      // it appears the create was not successful after all so still
      setSubmitting(false)
      setError(['could not create a campaign application'])
      return
    }

    const campaignApplication = dataOrError.data
    setCreated(true)
    setCampaignApplicationResult(campaignApplication)

    const uploadedFilesMap = new Map<string, 'success' | 'fail'>()
    const deletedFilesMap = new Map<string, 'success' | 'fail'>()
    const filesToUpload = isEdit
      ? files.filter(
          (f) => f.size > 0 && !existing?.documents.some((d) => d.filename === f.name),
        ) ?? []
      : files
    const filesToDelete =
      existing?.documents.filter((d) => !files.some((f) => f.name === d.filename)) ?? []

    await Promise.all([
      ...filesToDelete.map((f) =>
        fileDelete
          .mutateAsync(f.id)
          .then(() => deletedFilesMap.set(f.filename, 'success'))
          .catch(() => deletedFilesMap.set(f.filename, 'fail')),
      ),
      ...filesToUpload.map((f) =>
        fileUpload
          .mutateAsync({ campaignApplicationId: campaignApplication.id, files: [f] })
          .then(() => uploadedFilesMap.set(f.name, 'success'))
          .catch(() => uploadedFilesMap.set(f.name, 'fail')),
      ),
    ])

    const fileUploadResults = [...uploadedFilesMap.entries()].reduce((a, [key, value]) => {
      value === 'fail' ? a.failed.push(key) : a.successful.push(key)
      return a
    }, uploadedFiles)
    const fileDeleteResults = [...deletedFilesMap.entries()].reduce((a, [key, value]) => {
      value === 'fail' ? a.failed.push(key) : a.successful.push(key)
      return a
    }, deletedFiles)

    setFileUploadState(fileUploadResults)
    setFileDeletedState(fileDeleteResults)
    setSubmitting(false)

    return { id: campaignApplication.id, ...input }
  }

  return {
    createOrUpdateApplication,
    applicationCreated: created,
    submitting,
    uploadedFiles,
    error,
    campaignApplicationResult,
    files,
    setFiles,
    initialValues,
    deletedFiles,
  }
}

export function mapExistingOrNew(
  isEdit: boolean | undefined,
  existing: CampaignApplicationExisting | undefined,
  person: Person | undefined,
): CampaignApplicationFormData {
  return {
    organizer: {
      name: (isEdit ? existing?.organizerName : `${person?.firstName} ${person?.lastName}`) ?? '',
      phone: (isEdit ? existing?.organizerPhone : person?.phone) ?? '',
      email: (isEdit ? existing?.organizerEmail : person?.email) ?? '',
      acceptTermsAndConditions: isEdit ? true : false,
      transparencyTermsAccepted: isEdit ? true : false,
      personalInformationProcessingAccepted: isEdit ? true : false,
    },
    applicationBasic: {
      title: existing?.campaignName ?? '',
      beneficiaryNames: existing?.beneficiary ?? '',
      campaignType: existing?.campaignTypeId ?? '',
      funds: isNaN(parseInt(existing?.amount ?? '')) ? 0 : parseInt(existing?.amount ?? '0'),
      campaignEnd: existing?.campaignEnd ?? CampaignEndTypes.FUNDS,
      campaignEndDate: existing?.campaignEndDate,
    },
    applicationDetails: {
      cause: existing?.goal ?? '',
      currentStatus: existing?.history ?? '',
      description: existing?.description ?? '',
      organizerBeneficiaryRelationship: existing?.organizerBeneficiaryRel,
    },
  }
}

export function mapCreateOrEditInput(
  i: CampaignApplicationFormData,
): CreateCampaignApplicationInput {
  return {
    acceptTermsAndConditions: i.organizer.acceptTermsAndConditions,
    personalInformationProcessingAccepted: i.organizer.personalInformationProcessingAccepted,
    transparencyTermsAccepted: i.organizer.transparencyTermsAccepted,

    organizerName: i.organizer.name,
    organizerEmail: i.organizer.email,
    organizerPhone: i.organizer.phone,

    beneficiary: i.applicationBasic.beneficiaryNames,

    campaignName: i.applicationBasic.title,
    amount: i.applicationBasic.funds?.toString() ?? '',
    goal: i.applicationDetails.cause,
    description: i.applicationDetails.description,
    organizerBeneficiaryRel: i.applicationDetails.organizerBeneficiaryRelationship,
    history: i.applicationDetails.currentStatus,
    campaignEnd: i.applicationBasic.campaignEnd,
    campaignEndDate: i.applicationBasic.campaignEndDate,
    campaignTypeId: i.applicationBasic.campaignType,
  }
}
