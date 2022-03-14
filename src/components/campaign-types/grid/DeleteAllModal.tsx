import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { CampaignTypesResponse } from 'gql/campaign-types'
import { ApiErrors } from 'service/apiErrors'
import { routes } from 'common/routes'
import { useRemoveManyCampaignTypes } from 'service/restRequests/campaignTypes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'

import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('documents')

  const mutationFn = useRemoveManyCampaignTypes(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<CampaignTypesResponse[]>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.deleteAll'), 'success')
      router.push(routes.admin.campaignTypes.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
