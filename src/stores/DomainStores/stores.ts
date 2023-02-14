import { DonationStore } from './DonationStore'

export default class Stores {
  donationStore = new DonationStore()
}

const stores = new Stores()

export { stores }
