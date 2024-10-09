import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useTranslation } from 'next-i18next'

import { endpoints } from 'service/apiEndpoints'
import { ApiErrors } from 'service/apiErrors'

import { UploadedFile, UploadedFilesList } from 'components/common/file-upload/UploadedFilesList'

import { useSession } from 'next-auth/react'
import {
  fetchCampaignApplicationFile,
  useDeleteCampaignApplicationFile,
} from 'service/campaign-application'
import { AlertStore } from 'stores/AlertStore'

type Props = {
  campaignApplicationId: string
  files: UploadedFile[]
}

export default function UploadedCampaignApplicationFiles({ files, campaignApplicationId }: Props) {
  const { t } = useTranslation(['common', 'campaign-applications'])
  const queryClient = useQueryClient()
  const { data: session } = useSession()

  const del = useMutation<unknown, AxiosError<ApiErrors>, string>({
    mutationFn: (fileId) => useDeleteCampaignApplicationFile(session)(fileId),
    onError: () => AlertStore.show(t('common:alerts.errorDeletingFile'), 'error'),
    onSuccess: () => {
      AlertStore.show(t('common:files.deletedFile'), 'success')
      queryClient.invalidateQueries([endpoints.campaignApplication.view(campaignApplicationId).url])
    },
  })

  return (
    <UploadedFilesList
      files={files}
      downloadQuery={(f) => fetchCampaignApplicationFile(f.id, session).then((r) => r.data)}
      deleteMutation={(f) => del.mutateAsync(f.id)}
    />
  )
}
