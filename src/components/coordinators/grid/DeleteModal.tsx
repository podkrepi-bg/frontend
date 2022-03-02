import { useMutation, useQueryClient } from 'react-query'
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'

import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { useDeleteCoordinator } from 'service/restRequests'
import { CoordinatorResponse } from 'gql/coordinators'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'

export default observer(function DeleteModal() {
  const queryClient = useQueryClient()
  const { isDeleteOpen, hideDelete, selectedRecord } = ModalStore
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      hideDelete()
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries(endpoints.coordinators.coordinatorsList.url)
    },
  })

  const deleteHandler = () => {
    mutation.mutate(selectedRecord.id)
  }

  return (
    <Dialog open={isDeleteOpen} onClose={hideDelete} maxWidth="xs" disableScrollLock>
      <DialogTitle>
        {t('coordinator:alert:delete-row:question')} ({selectedRecord.name})?
      </DialogTitle>
      <DialogActions>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteHandler}>
          {t('coordinator:btns:confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={hideDelete}>
          {t('coordinator:btns:cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
