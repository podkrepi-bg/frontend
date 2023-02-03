import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering, inject } from 'mobx-react'
import { io, Socket } from 'socket.io-client'
import Stores from './DomainStores/stores'
import { NotificationStore } from './NotificationStore'
import { NotificationLayoutData } from 'components/layout/NotificationSnackBar/DonationNotificationLayout'

enableStaticRendering(typeof window === 'undefined')
export class SocketClientStore {
  socketClient: Socket | null = null
  notificationStore: NotificationStore | null = null

  constructor(stores: Stores) {
    this.notificationStore = stores.notificationStore
    makeObservable(this, {
      socketClient: observable,
      initiate: action,
      handleDonationNotification: action,
    })
  }

  initiate(url: string, config: Record<string, unknown>) {
    if (!this.socketClient) {
      this.socketClient = io(url, config)

      this.socketClient.on('connect', () => {
        console.log('Websocket connection established')
      })

      this.socketClient.on('successfulDonation', (notificationData: NotificationLayoutData) => {
        this.handleDonationNotification(notificationData)
      })
    }
  }

  handleDonationNotification(notificationData: NotificationLayoutData) {
    this.notificationStore?.globalNotifications?.add(notificationData)
  }
}
