import { useMutation } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'

import { BenefactorResponse } from 'gql/benefactor'
import { ApiErrors } from 'service/apiErrors'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { deleteBenefactor } from 'service/benefactor'
import { AlertStore } from 'stores/AlertStore'
import DeleteAllDialog from 'components/admin/DeleteAllDialog'

export default observer(function DeleteAllModal() {
  const router = useRouter()
  const { hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('benefactor')

  const mutationFn = deleteBenefactor

  const mutation = useMutation<AxiosResponse<BenefactorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn,
    onError: () => AlertStore.show(t('alerts.delete-rows.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('alerts.delete-rows.success'), 'success')
      router.push(routes.admin.benefactor.index)
    },
  })

  function deleteHandler() {
    selectedIdsToDelete.map((id) => mutation.mutate(id))
  }

  return <DeleteAllDialog deleteHandler={deleteHandler} />
})
