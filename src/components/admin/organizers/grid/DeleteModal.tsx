import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'

import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import DeleteDialog from 'components/admin/DeleteDialog'

import { ModalStore } from '../OrganizerPage'
import { OrganizerResponse } from 'gql/organizer'
import { deleteOrganizer } from 'service/organizer'

export default observer(function DeleteModal() {
  const { t } = useTranslation('organizer')
  const queryClient = useQueryClient()
  const router = useRouter()

  const { hideDelete, selectedRecord } = ModalStore

  const mutation = useMutation<AxiosResponse<OrganizerResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: deleteOrganizer(selectedRecord.id),
    onError: () => AlertStore.show(t('admin.alerts.delete-error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('admin.alerts.delete'), 'success')
      queryClient.invalidateQueries([endpoints.organizer.listOrganizer.url])
      router.push(routes.admin.organizers.index)
    },
  })

  function deleteHandler() {
    mutation.mutate(selectedRecord.id)
  }

  return <DeleteDialog modalStore={ModalStore} deleteHandler={deleteHandler} />
})
