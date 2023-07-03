import getConfig from 'next/config'
import { io } from 'socket.io-client'

const { publicRuntimeConfig } = getConfig()
const notificationClient = io(publicRuntimeConfig.API_URL, {
  transports: ['websocket'],
  autoConnect: false,
})

export default notificationClient
