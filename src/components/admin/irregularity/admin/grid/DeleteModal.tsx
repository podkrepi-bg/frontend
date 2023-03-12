import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { deleteIrregularity } from 'service/irregularity'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../IrregularityPage'
import { IrregularityResponse } from 'components/client/irregularity/helpers/irregularity.types'

export default observer(function DeleteModal() {
  const { t } = useTranslation('irregularity')
  const queryClient = useQueryClient()
  const router = useRouter()

  const { hideDelete, selectedRecord } = ModalStore

  const mutation = useMutation<AxiosResponse<IrregularityResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteIrregularity(selectedRecord.id),
    onError: () => AlertStore.show(t('admin.alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('admin.alerts.delete'), 'success')
      queryClient.invalidateQueries([endpoints.irregularity.irregularityList.url])
      router.push(routes.admin.irregularity.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
