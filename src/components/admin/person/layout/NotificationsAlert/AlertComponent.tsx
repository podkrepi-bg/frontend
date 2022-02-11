import React, { useState } from 'react'
import { Alert, Snackbar } from '@mui/material'
import { observer } from 'mobx-react'
import { AlertStore } from './AlertStore'
import theme from '../theme'

function AlertComponent() {
  const [open, setOpen] = useState(true)
  const { getAlerts } = AlertStore
  const handleClose = () => {
    setOpen(false)
    AlertStore.hide()
  }

  return (
    <>
      {getAlerts.map(({ type, message }) => {
        return (
          <Snackbar
            key={message[0]}
            style={{ position: 'relative', right: '10px', bottom: '10%' }}
            open={open}
            autoHideDuration={10000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <Alert onClose={handleClose} color={type}>
              {message}
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}

export default observer(AlertComponent)
