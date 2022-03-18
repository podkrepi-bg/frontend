import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { BankAccountResponse } from 'gql/bankaccounts'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteManyBankAccounts } from 'service/bankAccount'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

import { ModalStore } from '../BankAccountsPage'

export default observer(function DeleteAllModal() {
  const queryClient = useQueryClient()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete, setSelectedRecord } =
    ModalStore
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
      queryClient.invalidateQueries(endpoints.bankAccounts.bankAccountList.url)
      hideDeleteAll()
      setSelectedRecord({ id: '', name: '' })
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.deleteAll'), 'success')
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
