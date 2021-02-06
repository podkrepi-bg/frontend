import React from 'react'
import { observer } from 'mobx-react'
import { Snackbar, SnackbarCloseReason } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AlertStore } from 'stores/AlertStore'

function SnackBar() {
  const { getAlerts } = AlertStore

  const handleSnackBarClose = (_event: React.SyntheticEvent, reason: SnackbarCloseReason) => {
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
          <Snackbar key={id} open={show} autoHideDuration={duration} onClose={handleSnackBarClose}>
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
