import React from 'react'
import { observer } from 'mobx-react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AlertStore } from 'stores/AlertStore'

function SnackBar() {
  const { getAlerts } = AlertStore

  const handleClose = () => AlertStore.hide()
  const handleExited = () => AlertStore.clear()

  return (
    <>
      {getAlerts.map(({ id, show, duration, type, message }) => {
        return (
          <Snackbar
            key={id}
            open={show}
            autoHideDuration={duration}
            onClose={handleClose}
            onExited={handleExited}>
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
