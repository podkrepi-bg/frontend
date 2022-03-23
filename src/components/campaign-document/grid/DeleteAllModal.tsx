import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'
import { campaignDocumentResponse } from 'gql/campaign-document'
import { useRemoveManyCampaignDocument } from 'service/campaignDocument'
import { GridSelectionModel } from '@mui/x-data-grid'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('campaign-document')

  const mutationFn = useRemoveManyCampaignDocument(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<campaignDocumentResponse[]>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.delete-all'), 'success')
      router.push(routes.admin.campaignDocument.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
