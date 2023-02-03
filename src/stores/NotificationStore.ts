import { Slide, SnackbarProps, PaperProps } from '@mui/material'
import { NotificationLayoutData } from 'components/layout/NotificationSnackBar/DonationNotificationLayout'
import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')
export class NotificationStack {
  snackbarProps: SnackbarProps
  snackbarContentProps: PaperProps
  notifications: NotificationLayoutData[] = []

  add(notification: NotificationLayoutData) {
    this.notifications = [...this.notifications, notification]
  }

  remove() {
    this.notifications = this.notifications.slice(1)
  }

  get getNotifications() {
    return this.notifications
  }

  constructor(snackbarProps: SnackbarProps, snackbarContentProps: PaperProps) {
    this.snackbarProps = snackbarProps
    this.snackbarContentProps = snackbarContentProps
    makeAutoObservable(this)
  }
}

export class NotificationStore {
  globalNotifications: NotificationStack = new NotificationStack(
    {
      anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      autoHideDuration: 3000,
      transitionDuration: 2000,
      TransitionComponent: Slide,
    },
    {
      sx: {
        minWidth: '300px',
        backgroundColor: 'white',
        color: 'black',
      },
    },
  )

  constructor() {
    makeAutoObservable(this)
  }
}
