import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Snackbar, SnackbarCloseReason } from '@mui/material'
import { NotificationStack } from 'stores/NotificationStore'
import { useStores } from 'common/hooks/useStores'
import { reaction } from 'mobx'

function NotificationSnackBar({
  notificationStack,
}: {
  notificationStack: NotificationStack | undefined
}) {
  const { notificationStore } = useStores()
  const autoHideDuration = 5000

  const handleSnackBarClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }
    console.log('closing?')
    // notificationStore?.globalNotifications?.remove()
    // notificationStack.remove()
    // notificationStack?.remove()
  }
  // const handleClose = () => AlertStore.hide()

  const handleTest = () => {
    console.log(notificationStore.globalNotifications.notifications, 'ns.global')
    console.log(notificationStack, 'notificationStack')
    console.log(
      notificationStore.globalNotifications.notifications === notificationStack?.notifications,
    )
    console.log(notificationStore.globalNotifications === notificationStack)

    notificationStack?.remove()
    // notificationStack?.add('Pesho')
  }

  return (
    <Snackbar
      open={true}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={autoHideDuration}
      message={
        `${notificationStack?.notifications?.[0]} ${notificationStore.globalNotifications.notifications?.[0]}` ||
        'nema'
      }
      onClose={handleSnackBarClose}
      onClick={handleTest}
    />
  )
}

export default observer(NotificationSnackBar)
