import React from 'react'
import { observer } from 'mobx-react'
import { Snackbar, SnackbarCloseReason } from '@mui/material'
import { Alert } from '@mui/material'
import { AlertStore } from 'stores/AlertStore'

function SnackBar() {
  const { getAlerts } = AlertStore

  const handleSnackBarClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    AlertStore.hide()
  }
  const handleClose = () => AlertStore.hide()

  return (
    <>
      {getAlerts.map(({ id, show, duration, type, message }) => {
        return (
          <Snackbar
            key={id}
            open={show}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            autoHideDuration={duration}
            onClose={handleSnackBarClose}>
            <Alert severity={type} onClose={handleClose}>
              {message}
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}

export default observer(SnackBar)
