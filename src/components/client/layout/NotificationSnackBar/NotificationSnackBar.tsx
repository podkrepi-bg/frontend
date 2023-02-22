import React, { useEffect, useState } from 'react'
import {
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  SnackbarProps,
  PaperProps,
} from '@mui/material'
import DonationNotificationLayout from './DonationNotificationLayout'
import { NotificationLayoutData } from 'components/client/layout/NotificationSnackBar/DonationNotificationLayout'
import notificationClient from 'common/util/notificationClient'

function NotificationSnackBar({
  mainProps,
  contentProps,
}: {
  mainProps: SnackbarProps
  contentProps: PaperProps
}) {
  const [open, setOpen] = useState(true)
  const [notifications, setNotifications] = useState<NotificationLayoutData[]>([])

  useEffect(() => {
    notificationClient.on('successfulDonation', (notificationData: NotificationLayoutData) => {
      setNotifications((prevState) => [...prevState, notificationData])
    })

    return () => {
      notificationClient.off('successfulDonation')
    }
  }, [])

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
      setNotifications(notifications.slice(1))
      if (notifications.length) setOpen(true)
      clearTimeout(interval)
    }, mainProps.transitionDuration as number)
  }

  return (
    <Snackbar open={open && !!notifications.length} onClose={handleSnackBarClose} {...mainProps}>
      <SnackbarContent
        message={<DonationNotificationLayout data={notifications[0] || ''} />}
        {...contentProps}
      />
    </Snackbar>
  )
}

export default NotificationSnackBar
