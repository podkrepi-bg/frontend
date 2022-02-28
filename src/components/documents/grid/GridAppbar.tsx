import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import { routes } from 'common/routes'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { AlertStore } from 'stores/AlertStore'
import { useMutation } from 'react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { ApiErrors } from 'service/apiErrors'
import { DocumentResponse } from 'gql/document'
import { useDeleteDocument } from 'service/restRequests'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
const iconStyles = {
  background: 'white',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 0.5,
  boxShadow: 3,
  mr: 1,
}

export default observer(function GridAppbar() {
  const { isDeleteAllOpen, idsToDelete } = ModalStore
  const router = useRouter()
  const { t } = useTranslation()

  const mutation = useMutation<AxiosResponse<DocumentResponse>, AxiosError<ApiErrors>, string>({
    mutationFn: useDeleteDocument(),
    onError: () => AlertStore.show(t('common:alerts.error'), 'error'),
    onSuccess: () => AlertStore.show(t('common:alerts.message-sent'), 'success'),
  })

  const deleteAll = (idsToDelete: string[]) => {
    Promise.all(idsToDelete.map((id: string) => mutation.mutateAsync(id))).then(() => {
      router.push(routes.admin.coordinators.index)
    })
  }

  function deleteAllClickHandler() {
    isDeleteAllOpen
      ? deleteAll(idsToDelete)
      : AlertStore.show(t('documents:alerts:selectRow'), 'warning')
  }

  return (
    <Toolbar
      sx={{
        background: 'white',
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{t('documents:all')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('documents:cta:deleteSelected') || ''}>
            <DeleteIcon
              onClick={deleteAllClickHandler}
              sx={iconStyles}
              fontSize="medium"
              color="action"
            />
          </Tooltip>
          <Tooltip title={t('documents:cta:add') || ''}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push(routes.admin.documents.create)
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
