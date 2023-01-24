import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { io, Socket } from 'socket.io-client'

enableStaticRendering(typeof window === 'undefined')

class SocketClientStore {
  socketClient: Socket | null = null

  constructor() {
    makeObservable(this, {
      socketClient: observable,
      initiate: action,
    })
  }

  initiate(url: string, config: Record<string, unknown>) {
    if (!this.socketClient) {
      this.socketClient = io(url, config)

      this.socketClient.on('connect', () => {
        console.log('Websocket connection established')
      })

      this.socketClient.on('successfulDonation', (data) => {
        console.log('Got donation: ', JSON.stringify(data))
      })
    }
  }
}

export default SocketClientStore
