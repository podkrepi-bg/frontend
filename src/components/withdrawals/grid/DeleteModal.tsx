import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { WithdrawalResponse } from 'gql/withdrawals'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteWithdrawal } from 'service/withdrawal'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('withdrawals')

  const mutationFn = useDeleteWithdrawal(selectedRecord.id)

  const deleteMutation = useMutation<
    AxiosResponse<WithdrawalResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'success')
      router.push(routes.admin.withdrawals.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
