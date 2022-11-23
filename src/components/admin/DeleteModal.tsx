import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { ApiErrors } from 'service/apiErrors'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'

type Props = {
  modalStore: ModalStoreImpl
  mutationFn: (id: string) => Promise<AxiosResponse>
  translate: string //translate exemple: 'file_name:alerts.error', 'file_name:'alerts.delete
  endpoint: string
}

export default observer(function DeleteModal({
  modalStore,
  mutationFn,
  translate,
  endpoint,
}: Props) {
  const { hideDelete, selectedRecord } = modalStore
  const { t } = useTranslation(translate)
  const queryClient = useQueryClient()

  const deleteMutation = useMutation<AxiosResponse, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'warning')
      queryClient.invalidateQueries([endpoint])
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={modalStore} deleteHandler={deleteHandler} />
})
