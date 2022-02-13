import { Box, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { useTranslation } from 'next-i18next'
import Toolbar from '@mui/material/Toolbar'
import { observer } from 'mobx-react'
import { AlertStore } from 'stores/AlertStore'
import { ModalStore } from 'stores/cars/ModalStore'
import { useRouter } from 'next/router'

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
        <Typography>All people</Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Delete selected">
            <DeleteIcon onClick={deleteHandler} sx={iconStyles} fontSize="medium" color="action" />
          </Tooltip>
          <Tooltip
            title="Add"
            onClick={() => {
              router.push('/admin/person/add')
            }}>
            <AddIcon sx={addIconStyles} fontSize="large" />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
})
