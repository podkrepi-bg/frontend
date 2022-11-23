import { useMutation } from '@tanstack/react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { RecurringDonationResponse } from 'gql/recurring-donation'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteRecurringDonation } from 'service/recurringDonation'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('recurring-donation')

  const mutationFn = useDeleteRecurringDonation(selectedRecord.id)

  const deleteMutation = useMutation<
    AxiosResponse<RecurringDonationResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete'), 'success')
      router.push(routes.admin.recurringDonation.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
