import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export interface NotificationStackInterface {
  notifications: string[]
  add(notification: string): void
  remove(): void
}

export class NotificationStack {
  notifications: string[] = []

  add(notification: string) {
    console.log('add fired')
    this.notifications = [...this.notifications, notification]
  }

  remove() {
    console.log('remove fired')
    this.notifications = this.notifications.slice(1)
  }

  get getNotifications() {
    return this.notifications
  }
}

export class NotificationStore {
  globalNotifications: NotificationStack = new NotificationStack()
  testNotifications: NotificationStack = new NotificationStack()

  constructor() {
    makeObservable(this, {
      globalNotifications: observable,
      testNotifications: observable,
    })
  }
}

export default NotificationStore
