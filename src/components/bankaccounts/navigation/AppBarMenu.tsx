import DeleteIcon from '@mui/icons-material/Delete'
import Container from '@mui/material/Container'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { ModalStore } from 'stores/cars/ModalStore'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useRouter } from 'next/router'
import { observer } from 'mobx-react'
import Box from '@mui/material/Box'
import { routes } from 'common/routes'
const addIconStyles = {
  transform: 'scale(1.3)',
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
export default observer(function AppBarMenu() {
  const { setMessage, openNotifications } = NotificationStore
  const { carSelected, openCfrm } = ModalStore
  const router = useRouter()
  const handleDelete = (): void => {
    if (carSelected) {
      openCfrm()
    } else {
      setMessage('Моля изберете поне един ред')
      openNotifications()
    }
  }

  return (
    <AppBar elevation={0} sx={{ background: 'white' }} position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between', px: '11px' }}>
          <Typography variant="h5">Списък с коли</Typography>
          <Box>
            <Tooltip title="Добави">
              <AddIcon
                onClick={() => {
                  router.push(routes.bankaccounts.add)
                }}
                sx={addIconStyles}
                style={{ marginRight: '20px' }}
                fontSize="large"></AddIcon>
            </Tooltip>
            <Tooltip title="Изтрий избраните">
              <DeleteIcon
                style={{ background: '#f7f7f7', color: 'red' }}
                onClick={handleDelete}
                sx={addIconStyles}
                fontSize="large"></DeleteIcon>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
})
