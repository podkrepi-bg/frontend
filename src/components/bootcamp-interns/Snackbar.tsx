import { SyntheticEvent } from 'react'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { NotificationStore } from 'stores/bootcamp-interns/NotificationStore'

export default function Notifications() {
  const { isNotificationShown, hideNotification, notificationMessage } = NotificationStore

  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return
    hideNotification()
  }

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <Snackbar
      open={isNotificationShown}
      autoHideDuration={2000}
      onClose={handleClose}
      message={notificationMessage}
      action={action}
    />
  )
}
