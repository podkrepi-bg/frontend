import DeleteIcon from '@mui/icons-material/Delete'
import { ModalContext } from 'context/ModalContext'
import Container from '@mui/material/Container'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import Toolbar from '@mui/material/Toolbar'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import { useContext } from 'react'
const addIconStyles = {
  transform: 'scale(1.3)',
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
export default function AppBarMenu() {
  const router = useRouter()
  const {
    setNotificationMessage,
    setNotificationsOpen,
    setConfirmationOpen,
    areCarsSelected,
  }: any = useContext(ModalContext)

  const handleDelete = (): void => {
    if (areCarsSelected) {
      setConfirmationOpen(true)
    } else {
      setNotificationMessage('Моля изберете поне един ред')
      setNotificationsOpen(true)
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
                  router.push('/tasks/add')
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
}
