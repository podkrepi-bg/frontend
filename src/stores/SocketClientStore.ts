import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering, inject } from 'mobx-react'
import { io, Socket } from 'socket.io-client'
import Stores from './DomainStores/stores'
import NotificationStore from './NotificationStore'

enableStaticRendering(typeof window === 'undefined')
class SocketClientStore {
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

      this.socketClient.on('successfulDonation', (notification: string) => {
        console.log('Got donation')
        this.handleDonationNotification(notification)
      })
    }
  }

  handleDonationNotification(notification: string) {
    console.log('handle fired')
    this.notificationStore?.globalNotifications?.add(notification)
    // this.notificationStore?.addGlobalNotification(notification)
    // this.notificationStore?.updatePesho('pesho' + Math.random())
  }
}

export default SocketClientStore
