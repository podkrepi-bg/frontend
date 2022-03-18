import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { CityResponse } from 'gql/cities'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteCity } from 'service/city'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('cities')

  const mutationFn = useDeleteCity()

  const mutation = useMutation<AxiosResponse<CityResponse>, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.deleteAll'), 'success')
      router.push(routes.admin.cities.home)
    },
  })

  function deleteHandler() {
    selectedIdsToDelete.map((id) => mutation.mutate(id))
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
