import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'
import { useDeleteMany } from 'service/bootcamp'
import { BootcampResponse } from 'gql/bootcamp'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { selectedIdsToDelete, setSelectedIdsToDelete, hideDeleteAll } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteMany(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<BootcampResponse[]>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('documents:alerts:deleteAll'), 'success')
      router.push(routes.admin.bootcamp.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
