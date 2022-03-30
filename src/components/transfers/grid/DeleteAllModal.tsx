import React from 'react'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'

import { GridSelectionModel } from '@mui/x-data-grid'

import { ApiErrors } from 'service/apiErrors'
import { useDeleteManyTransfer } from 'service/transfer'

import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'

import { routes } from 'common/routes'
import { TransferResponse } from 'gql/transfer'

import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()

  const { t } = useTranslation('transfer')

  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore

  const mutation = useMutation<
    AxiosResponse<TransferResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn: useDeleteManyTransfer(selectedIdsToDelete),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.deleteAll'), 'success')
      router.push(routes.admin.transfer.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
