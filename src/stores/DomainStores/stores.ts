import { NotificationStore } from 'stores/NotificationStore'
import { SocketClientStore } from 'stores/SocketClientStore'
import { DonationStore } from './DonationStore'

export default class Stores {
  donationStore = new DonationStore()
  notificationStore = new NotificationStore()
  socketClientStore = new SocketClientStore(this)
}

const stores = new Stores()

export { stores }
