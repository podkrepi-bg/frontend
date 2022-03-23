import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { campaignDocumentResponse } from 'gql/campaign-document'
import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'

import DeleteDialog from 'components/admin/DeleteDialog'
import { useDeleteCampaignDocument } from 'service/campaignDocument'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('campaign-document')

  const mutationFn = useDeleteCampaignDocument()

  const deleteMutation = useMutation<
    AxiosResponse<campaignDocumentResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'warning')
      router.push(routes.admin.campaignDocument.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
