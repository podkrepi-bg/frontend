import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { useContext, SyntheticEvent } from 'react'

import { DrawerContext } from 'context/SwipeableDrawerContext'

export default function Notifications() {
  const { notificationsOpen, setNotificationsOpen, notificationMessage }: any =
    useContext(DrawerContext)
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setNotificationsOpen(false)
  }
  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <div>
      <Snackbar
        open={notificationsOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={notificationMessage}
        action={action}
      />
    </div>
  )
}
