import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class NotificationStoreImpl {
  areNotificationsOpen: boolean = false
  notificationsMessage: string = ''

  constructor() {
    makeObservable(this, {
      areNotificationsOpen: observable,
      notificationsMessage: observable,
      openNotifications: action,
      closeNotifications: action,
      setMessage: action,
    })
  }

  setMessage = (message: string) => {
    this.notificationsMessage = message
  }

  openNotifications = () => {
    this.areNotificationsOpen = true
  }

  closeNotifications = () => {
    this.areNotificationsOpen = false
  }
}

export const NotificationStore = new NotificationStoreImpl()
