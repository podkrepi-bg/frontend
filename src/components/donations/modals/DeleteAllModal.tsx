import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { GridSelectionModel } from '@mui/x-data-grid'
import { useTranslation } from 'next-i18next'

import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { DonationResponse } from 'gql/donations'
import { useDeleteDonation } from 'service/donation'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'
import { routes } from 'common/routes'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation()

  const mutationFn = useDeleteDonation(selectedIdsToDelete)

  const mutation = useMutation<
    AxiosResponse<DonationResponse>,
    AxiosError<ApiErrors>,
    GridSelectionModel
  >({
    mutationFn,
    onError: () => AlertStore.show(t('donations:alerts:error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('donations:alerts:deleteAll'), 'success')
      router.push(routes.admin.donations.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedIdsToDelete)
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
