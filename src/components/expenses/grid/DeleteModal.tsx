import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { ExpenseResponse } from 'gql/expenses'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteExpense } from 'service/expense'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'
import { endpoints } from 'service/apiEndpoints'

export default observer(function DeleteModal() {
  const queryClient = useQueryClient()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('expenses')

  const mutationFn = useDeleteExpense()

  const deleteMutation = useMutation<AxiosResponse<ExpenseResponse>, AxiosError<ApiErrors>, string>(
    {
      mutationFn,
      onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
      onSuccess: () => {
        queryClient.invalidateQueries(endpoints.expenses.listExpenses.url)
        hideDelete()
        AlertStore.show(t('alerts.delete-row.success'), 'success')
      },
    },
  )

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
