import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { endpoints } from 'service/apiEndpoints'
import { ExpenseResponse } from 'gql/expenses'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteManyExpenses } from 'service/expense'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const queryClient = useQueryClient()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('expenses')

  const mutationFn = useDeleteManyExpenses(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<ExpenseResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.delete-rows.error'), 'error'),
    onSuccess: () => {
      queryClient.invalidateQueries(endpoints.expenses.listExpenses.url)
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.delete-rows.success'), 'success')
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
