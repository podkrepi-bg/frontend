import React from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { CountryResponse } from 'gql/countries'
import { ApiErrors } from 'service/apiErrors'
import { useDeleteCountry } from 'service/restRequests/country'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { routes } from 'common/routes'
import DeleteDialog from 'components/admin/DeleteDialog'

export default observer(function DeleteModal() {
  const router = useRouter()
  const { hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation('countries')

  const mutationFn = useDeleteCountry()

  const mutation = useMutation<AxiosResponse<CountryResponse>, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.delete-row.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('alerts.delete-row.success'), 'success')
      router.push(routes.admin.countries.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog deleteHandler={deleteHandler} />
})
