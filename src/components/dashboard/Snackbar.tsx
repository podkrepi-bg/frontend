import React from 'react'
import { observer } from 'mobx-react'
import { Snackbar, SnackbarCloseReason, Typography } from '@mui/material'
import { Alert } from '@mui/material'

import { AlertStore } from 'stores/AlertStore'

import { DashboardStore } from 'stores/DashboardStore'

function DashboardSnackBar() {
  const { getAlerts } = AlertStore
  const { drawerOpen, drawerCompact } = DashboardStore

  const handleSnackBarClose = (_event: React.SyntheticEvent, reason: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    AlertStore.hide()
  }
  const handleClose = () => AlertStore.hide()

  const getLeftPosition = (): string => {
    if (drawerOpen && drawerCompact) {
      return '98px'
    } else if (!drawerOpen) {
      return '40px'
    }

    return '235px'
  }

  return (
    <>
      {getAlerts.map(({ id, show, duration, type, message }) => {
        return (
          <Snackbar
            key={id}
            open={show}
            autoHideDuration={duration}
            onClose={handleSnackBarClose}
            style={{
              left: getLeftPosition(),
              bottom: '55px',
            }}>
            <Alert
              severity={type}
              onClose={handleClose}
              style={{
                boxShadow: '0 2px 3px 0 rgba(0,0,0,0.55)',
                borderRadius: '5px',
              }}>
              <Typography
                sx={{
                  fontFamily: 'Lato',
                  fontSize: '0.8rem',
                }}>
                {message}
              </Typography>
            </Alert>
          </Snackbar>
        )
      })}
    </>
  )
}

export default observer(DashboardSnackBar)
