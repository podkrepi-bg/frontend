import { action, computed, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import { DonationInput } from 'gql/donations'

enableStaticRendering(typeof window === 'undefined')

export class DonationStore {
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
  donationSearch: string | undefined = undefined

  constructor() {
    makeObservable(this, {
      donationFilters: observable,
      donationSearch: observable,
      setDonationFilters: action,
      getDonationFilters: computed,
      setDonationSearch: action,
      getDonationSearch: computed,
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

  setDonationSearch(value: string | undefined) {
    this.donationSearch = value
  }

  get getDonations() {
    return this.donations
  }

  get getDonationFilters() {
    return this.donationFilters
  }

  get getDonationSearch() {
    return this.donationSearch
  }
}
