import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from 'react-query'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteTransfer } from 'service/transfer'

import { TransferResponse } from 'gql/transfer'
import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'

import DeleteDialog from 'components/admin/DeleteDialog'

type Props = {
  id: string
}

export default observer(function DeleteModal({ id }: Props) {
  const { t } = useTranslation('transfer')

  const queryClient = useQueryClient()
  const { hideDelete } = ModalStore

  const mutation = useMutation<AxiosResponse<TransferResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteTransfer(String(id)),
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'success')
      queryClient.invalidateQueries(endpoints.transfer.listTransfer.url)
    },
  })

  function deleteHandler() {
    mutation.mutate(id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
