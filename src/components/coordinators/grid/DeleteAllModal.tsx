import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { observer } from 'mobx-react'
import { AxiosError, AxiosResponse } from 'axios'
import { Dialog, Button, DialogTitle, DialogActions } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { CoordinatorResponse } from 'gql/coordinators'
import { ApiErrors } from 'service/apiErrors'
import { endpoints } from 'service/apiEndpoints'
import { useDeleteCoordinator } from 'service/restRequests'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'

export default observer(function DeleteAllModal() {
  const queryClient = useQueryClient()
  const { isDeleteAllOpen, hideDeleteAll, selectedIdsToDelete, setSelectedIdsToDelete } = ModalStore
  const { t } = useTranslation('')

  const mutation = useMutation<AxiosResponse<CoordinatorResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteCoordinator(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => {
      hideDeleteAll()
      setSelectedIdsToDelete([])
      AlertStore.show(t('common:alerts.message-sent'), 'success')
      queryClient.invalidateQueries(endpoints.coordinators.coordinatorsList.url)
    },
  })

  const deleteAllHandler = async () => {
    await Promise.all(selectedIdsToDelete.map((id) => mutation.mutateAsync(id)))
  }

  return (
    <Dialog open={isDeleteAllOpen} onClose={hideDeleteAll} maxWidth="xs" disableScrollLock>
      <DialogTitle>
        {t('coordinator:alert.delete-row.question')} ({selectedIdsToDelete.length})?
      </DialogTitle>
      <DialogActions sx={{ m: '0 10px 10px 10px' }}>
        <Button variant="contained" color="secondary" fullWidth onClick={deleteAllHandler}>
          {t('coordinator:btns.confirm')}
        </Button>
        <Button variant="contained" color="primary" fullWidth onClick={hideDeleteAll}>
          {t('coordinator:btns.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
})
