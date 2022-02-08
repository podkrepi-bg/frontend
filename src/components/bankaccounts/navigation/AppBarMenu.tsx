import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { ModalStore } from 'stores/cars/ModalStore'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import Box from '@mui/material/Box'
import { routes } from 'common/routes'
import { AlertStore } from 'stores/AlertStore'
import { useTranslation } from 'next-i18next'
const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
export default observer(function AppBarMenu() {
  const { openCfrm, carSelected } = ModalStore
  const router = useRouter()
  const { t } = useTranslation()
  const deleteHandler = () => {
    carSelected ? openCfrm() : AlertStore.show(t('common:alerts.noselected'), 'info')
  }

  return (
    <Toolbar
      disableGutters
      variant="dense"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        background: 'white',
      }}>
      <Typography variant="h5" color="primary">
        Банкови сметки
      </Typography>
      <Box>
        <Tooltip title="Добави">
          <AddIcon
            onClick={() => {
              router.push(routes.bankaccounts.add)
            }}
            sx={addIconStyles}
            fontSize="large"></AddIcon>
        </Tooltip>
        <Tooltip title="Изтрий избраните">
          <DeleteIcon
            style={{ background: '#f7f7f7', color: 'red' }}
            onClick={deleteHandler}
            sx={addIconStyles}
            fontSize="large"></DeleteIcon>
        </Tooltip>
      </Box>
    </Toolbar>
  )
})
