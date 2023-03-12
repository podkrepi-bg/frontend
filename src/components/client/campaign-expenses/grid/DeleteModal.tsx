import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { useDeleteExpense } from 'service/expense'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from './CampaignExpensesGrid'
import { ExpenseResponse } from 'gql/expenses'

export default observer(function DeleteModal() {
  const { hideDelete, selectedRecord, setSelectedRecord } = ModalStore
  const { t } = useTranslation('common')

  const mutationFn = useDeleteExpense()

  const deleteMutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, string>(
    {
      mutationFn,
      onError: () => AlertStore.show(t('alerts.error'), 'error'),
      onSuccess: () => {
        setSelectedRecord({ id: '', name: '' })
        //  queryClient.invalidateQueries([endpoints.bankAccounts.bankAccountList.url])
        hideDelete()
        AlertStore.show(t('alerts.delete'), 'success')
      },
    },
  )

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
