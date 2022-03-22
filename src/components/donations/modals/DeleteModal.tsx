import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { DonationResponse } from 'gql/donations'
import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { useDeleteDonation } from 'service/donation'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteDonation([selectedRecord.id])

  const deleteMutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    string
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts:error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('donations:alerts:delete'), 'success')
      router.push(routes.admin.donations.index)
    },
  })

  function deleteHandler() {
    deleteMutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
