import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { DocumentResponse } from 'gql/document'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteDocument } from 'service/restRequests/document'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteDocument(selectedRecord.id)

  const deleteMutation = useMutation<
    AxiosResponse<DocumentResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('documents:alerts:delete'), 'success')
      router.push(routes.admin.documents.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
