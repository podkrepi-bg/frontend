import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { BankAccountResponse } from 'gql/bankaccounts'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteBankAccount } from 'service/bankAccount'
import { AlertStore } from 'stores/AlertStore'
import { endpoints } from 'service/apiEndpoints'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../BankAccountsPage'

export default observer(function DeleteModal() {
  const queryClient = useQueryClient()
  const { hideDelete, selectedRecord, setSelectedRecord } = ModalStore
  const { t } = useTranslation('bankaccounts')

  const mutationFn = useDeleteBankAccount(selectedRecord.id)

  const deleteMutation = useMutation<
    AxiosResponse<BankAccountResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      setSelectedRecord({ id: '', name: '' })
      queryClient.invalidateQueries(endpoints.bankAccounts.bankAccountList.url)
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'success')
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
