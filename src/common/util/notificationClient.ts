import { io } from 'socket.io-client'

const notificationClient = io(process.env.NEXT_PUBLIC_API_URL as string, {
  transports: ['websocket'],
  autoConnect: false,
})

export default notificationClient
