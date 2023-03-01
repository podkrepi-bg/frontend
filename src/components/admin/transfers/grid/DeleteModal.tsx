import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteTransfer } from 'service/transfer'

import { TransferResponse } from 'gql/transfer'
import { AlertStore } from 'stores/AlertStore'

import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../TransferPage'

export default observer(function DeleteModal() {
  const { t } = useTranslation('transfer')

  const queryClient = useQueryClient()
  const { hideDelete, selectedRecord } = ModalStore

  const mutation = useMutation<AxiosResponse<TransferResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteTransfer(selectedRecord.id),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'success')
      queryClient.invalidateQueries([endpoints.transfer.listTransfer.url])
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
