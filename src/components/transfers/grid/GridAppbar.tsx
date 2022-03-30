import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'

import { routes } from 'common/routes'

import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'

const toolbarStyles = {
  background: 'white',
  borderTop: '1px solid lightgrey',
  display: 'flex',
  justifyContent: 'space-between',
  height: '72px',
}

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
  const { showDeleteAll, selectedIdsToDelete } = ModalStore
  const router = useRouter()
  const { t } = useTranslation()

  function deleteAllClickHandler() {
    selectedIdsToDelete.length > 0
      ? showDeleteAll()
      : AlertStore.show(t('transfer:alerts:selectRow'), 'warning')
  }

  return (
    <Toolbar sx={toolbarStyles}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>{t('transfer:all')}</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('transfer:cta:deleteSelected') || ''}>
            <DeleteIcon
              onClick={deleteAllClickHandler}
              sx={iconStyles}
              fontSize="medium"
              color="action"
            />
          </Tooltip>
          <Tooltip title={t('transfer:cta:add') || ''}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push(routes.admin.transfer.create)
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
