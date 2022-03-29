import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { BeneficiaryType } from 'gql/beneficiary'
import { ApiErrors } from 'service/apiErrors'
import { useRemoveManyBeneficiaries } from 'service/beneficiary'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { selectedIdsToDelete, setSelectedIdsToDelete, hideDeleteAll } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useRemoveManyBeneficiaries(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<BeneficiaryType[]>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('documents:alerts:error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('documents:alerts:deleteAll'), 'success')
      router.push(routes.admin.beneficiary.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
