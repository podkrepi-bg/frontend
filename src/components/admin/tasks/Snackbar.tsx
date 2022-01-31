import { ModalContext } from 'context/ModalContext'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Snackbar from '@mui/material/Snackbar'
import { useContext } from 'react'
import * as React from 'react'
export default function Notifications() {
  const { notificationsOpen, setNotificationsOpen, notificationMessage }: any =
    useContext(ModalContext)
  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setNotificationsOpen(false)
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
        open={notificationsOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        message={notificationMessage}
        action={action}
      />
    </div>
  )
}
