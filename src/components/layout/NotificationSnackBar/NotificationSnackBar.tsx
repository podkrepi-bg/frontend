import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Snackbar, SnackbarCloseReason, SnackbarContent } from '@mui/material'
import { NotificationStack } from 'stores/NotificationStore'
import DonationNotificationLayout from './DonationNotificationLayout'

function NotificationSnackBar({
  notificationStack,
}: {
  notificationStack: NotificationStack | undefined
}) {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (notificationStack?.notifications.length) {
      setOpen(true)
    }
  }, [notificationStack?.notifications])

  const handleSnackBarClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    delayOpen()
  }

  const delayOpen = () => {
    const interval = setTimeout(() => {
      notificationStack?.remove()
      if (notificationStack?.notifications.length) setOpen(true)
      clearTimeout(interval)
    }, 2000)
  }

  return (
    <Snackbar
      {...notificationStack?.snackbarProps}
      open={open && !!notificationStack?.getNotifications.length}
      onClose={handleSnackBarClose}>
      <SnackbarContent
        message={
          <DonationNotificationLayout
            data={
              notificationStack?.getNotifications.length
                ? notificationStack?.notifications?.[0]
                : undefined
            }
          />
        }
        {...notificationStack?.snackbarContentProps}
      />
    </Snackbar>
  )
}

export default observer(NotificationSnackBar)
