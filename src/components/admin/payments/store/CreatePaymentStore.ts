import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import type {
  TBenevityCSVParser,
  TBenevityDonation,
} from '../create-payment/benevity/helpers/benevity.types'

enableStaticRendering(typeof window === 'undefined')

export const benevityInitialValues: TBenevityCSVParser = {
  charityId: '',
  charityName: '',
  currency: '',
  donations: [],
  periodEnding: '',
  paymentMethod: '',
  disbursementId: '',
  checkFee: '',
  totalDonationsGross: '',
  netTotalPayment: 0,
  transactionAmount: 0,
  exchangeRate: 0,
  note: '',
}

export const benevityDonationInitialValues: TBenevityDonation = {
  company: '',
  project: '',
  donationDate: '',
  donorFirstName: '',
  donorLastName: '',
  email: '',
  address: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  activity: '',
  comment: '',
  transactionId: '',
  donationFrequency: '',
  currency: '',
  projectRemoteId: '',
  source: '',
  reason: '',
  totalDonationToBeAcknowledged: 0,
  matchAmount: 0,
  causeSupportFee: 0,
  merchantFee: 0,
  feeComment: '',
  totalFee: 0,
  totalAmount: 0,
}

interface ICreatePaymentStoreImpl {
  isImportModalOpen: boolean
  showImportModal: () => void
  hideImportModal: () => void
}

export class CreatePaymentStoreImpl implements ICreatePaymentStoreImpl {
  isImportModalOpen = true

  constructor() {
    makeObservable(this, {
      isImportModalOpen: observable,
      showImportModal: action,
      hideImportModal: action,
    })
  }

  showImportModal = () => {
    this.isImportModalOpen = true
  }

  hideImportModal = () => {
    this.isImportModalOpen = false
  }
}

export const CreatePaymentStore = new CreatePaymentStoreImpl()
