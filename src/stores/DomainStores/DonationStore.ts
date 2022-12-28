import { action, computed, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { DonationInput } from 'gql/donations'

enableStaticRendering(typeof window === 'undefined')

class DonationStore {
  donations: DonationInput[] = []
  donationFilters: {
    status: string | null
    type: string | null
    date: {
      from?: Date | ''
      to?: Date | ''
    }
  } = {
    status: '',
    type: '',
    date: {
      from: '',
      to: '',
    },
  }

  constructor() {
    makeObservable(this, {
      donations: observable,
      donationFilters: observable,
      setDonationFilters: action,
      clear: action,
      setDonations: action,
      getDonations: computed,
      getDonationFilters: computed,
    })
  }

  clear() {
    this.donations = []
  }

  setDonations(donations: DonationInput[]) {
    this.donations = donations
  }

  setDonationFilters(
    key: keyof typeof this.donationFilters,
    value: string & null & { from: Date; to: Date },
  ) {
    this.donationFilters[key] = value
  }

  get getDonations() {
    return this.donations
  }

  get getDonationFilters() {
    return this.donationFilters
  }
}

export default DonationStore
