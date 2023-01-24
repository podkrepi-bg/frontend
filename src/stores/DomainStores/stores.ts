import SocketClientStore from 'stores/SocketClientStore'
import DonationStore from './DonationStore'

export const stores = {
  donationStore: new DonationStore(),
  socketClientStore: new SocketClientStore(),
}
