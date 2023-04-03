import { BankTransactionStore } from './BankTransactionStore'
import { DonationStore } from './DonationStore'

export default class Stores {
  donationStore = new DonationStore()
  bankTransactionsStore = new BankTransactionStore()
}

const stores = new Stores()

export { stores }
