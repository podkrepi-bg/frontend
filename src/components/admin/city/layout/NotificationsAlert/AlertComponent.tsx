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
            style={{ marginBottom: '20%' }}
            open={open}
            autoHideDuration={10000}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}>
            <Alert
              icon={false}
              onClose={handleClose}
              sx={{
                width: '100%',
                bgcolor: theme.palette.secondary.main,
                color: type === 'success' ? 'green' : 'red',
              }}>
              {message}
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}

export default observer(AlertComponent)
