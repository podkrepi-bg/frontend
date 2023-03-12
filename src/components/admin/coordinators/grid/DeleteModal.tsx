import { useMutation, useQueryClient } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { AlertStore } from 'stores/AlertStore'
import { useDeleteCoordinator } from 'service/coordinator'
import { CoordinatorResponse } from 'gql/coordinators'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../CoordinatorsPage'

export default observer(function DeleteModal() {
  const queryClient = useQueryClient()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries([endpoints.coordinators.coordinatorsList.url])
    },
  })

  const deleteHandler = () => {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
