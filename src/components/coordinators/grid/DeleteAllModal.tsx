import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { CoordinatorResponse } from 'gql/coordinators'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteCoordinator } from 'service/coordinator'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const queryClient = useQueryClient()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('')

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries(endpoints.coordinators.coordinatorsList.url)
    },
  })

  const deleteHandler = async () => {
    await Promise.all(selectedIdsToDelete.map((id) => mutation.mutateAsync(id)))
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
