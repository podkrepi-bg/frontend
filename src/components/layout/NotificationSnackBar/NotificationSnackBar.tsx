import React, { useEffect, useState } from 'react'
import {
  Snackbar,
  SnackbarCloseReason,
  SnackbarContent,
  SnackbarProps,
  PaperProps,
} from '@mui/material'
import DonationNotificationLayout from './DonationNotificationLayout'
import { NotificationLayoutData } from 'components/layout/NotificationSnackBar/DonationNotificationLayout'
import getConfig from 'next/config'
import { io } from 'socket.io-client'

const { publicRuntimeConfig } = getConfig()

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
    const socketClient = io(publicRuntimeConfig.API_URL, { transports: ['websocket'] })
    socketClient.on('connect', () => {
      console.log('Socket connection established')
    })
    socketClient?.on('successfulDonation', (notificationData: NotificationLayoutData) => {
      setNotifications([...notifications, notificationData])
    })
    return () => {
      socketClient.off('connect')
      socketClient.off('successfulDonation')
      socketClient.disconnect()
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
    }, 2000)
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
