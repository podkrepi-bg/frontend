import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { BankAccountResponse } from 'gql/bankaccounts'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteManyBankAccounts } from 'service/restRequests/bankAccount'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('bankaccounts')

  const mutationFn = useDeleteManyBankAccounts(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<BankAccountResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.deleteAll'), 'success')
      router.push(routes.admin.bankaccounts.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
