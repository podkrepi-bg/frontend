import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import PrintIcon from '@mui/icons-material/Print'
import SaveIcon from '@mui/icons-material/Save'
import ShareIcon from '@mui/icons-material/Share'
import EventNoteIcon from '@mui/icons-material/EventNote'
import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/dashboard/ModalStore'
import { routes } from 'common/routes'
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
export default observer(function BottomAppBar() {
  const { openCfrm, carSelected } = ModalStore
  const { t } = useTranslation()
  const router = useRouter()
  const deleteHandler = () => {
    carSelected ? openCfrm() : AlertStore.show(t('common:alerts.noselected'), 'info')
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
        <Typography>Всички банкови сметки</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Изтрий избраните">
            <EventNoteIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Изтрий избраните">
            <DeleteIcon onClick={deleteHandler} sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Изтрий избраните">
            <SaveIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Изтрий избраните">
            <PrintIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Изтрий избраните">
            <ShareIcon sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip title="Добави">
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() => {
                router.push(routes.bankaccounts.add)
              }}
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
