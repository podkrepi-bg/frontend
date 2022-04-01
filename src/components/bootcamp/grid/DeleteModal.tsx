import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { ApiErrors } from 'service/apiErrors'
import { useRemoveBeneficiary } from 'service/beneficiary'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'
import { deleteBootcamp } from 'service/bootcamp'
import { BootcampResponse } from 'gql/bootcamp'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutationFn = deleteBootcamp

  const deleteMutation = useMutation<
    AxiosResponse<BootcampResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('documents:alerts:delete'), 'success')
      router.push(routes.bootcamp.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
