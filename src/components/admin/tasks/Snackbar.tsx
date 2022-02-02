import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import * as React from 'react'
import { NotificationStore } from 'stores/cars/NotificationsStore'
import { observer } from 'mobx-react'
export default observer(function Notifications() {
  const { areNotificationsOpen, closeNotifications, notificationsMessage } = NotificationStore
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    closeNotifications()
  }
  const action = (
    <React.Fragment>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  )
  return (
    <div>
      <Snackbar
        open={areNotificationsOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={notificationsMessage}
        action={action}
      />
    </div>
  )
})
