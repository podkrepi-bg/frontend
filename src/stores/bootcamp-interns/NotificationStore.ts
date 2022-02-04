import { action, makeObservable, observable } from 'mobx'

import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class NotificationStoreImplementation {
  isNotificationShown = true
  notificationMessage = ''

  constructor() {
    makeObservable(this, {
      isNotificationShown: observable,
      hideNotification: action,
      showNotification: action,
      setNotificationMessage: action,
    })
  }

  setNotificationMessage = (message: string) => {
    this.notificationMessage = message
  }

  hideNotification = () => {
    this.isNotificationShown = false
  }

  showNotification = () => {
    this.isNotificationShown = true
  }
}

export const NotificationStore = new NotificationStoreImplementation()
