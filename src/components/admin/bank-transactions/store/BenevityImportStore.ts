import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'
import type { TBenevityCSVParser, TBenevityDonation } from 'common/util/benevityCSVParser'

enableStaticRendering(typeof window === 'undefined')

export type SelectedPaymentSource = 'none' | 'stripe' | 'benevity'
export type TImportType = 'none' | 'file' | 'manual'

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

interface IBenevityStoreImpl {
  isImportModalOpen: boolean
  importType: TImportType
  benevityData: TBenevityCSVParser
  selectedRecord: Record<'id', string>
  showImportModal: () => void
  hideImportModal: () => void
  setSelectedRecord: (record: Record<'id', string>) => void
  setImportType: (type: TImportType) => void
  setBenevityData: (data: TBenevityCSVParser) => void
}

export class BenevityImportStoreImpl implements IBenevityStoreImpl {
  isImportModalOpen = true
  selectedRecord = {
    id: '',
  }
  importType: TImportType = 'none'
  paymentSource: SelectedPaymentSource = 'none'
  benevityData: TBenevityCSVParser = benevityInitialValues
  step = 0

  constructor() {
    makeObservable(this, {
      isImportModalOpen: observable,
      selectedRecord: observable,
      paymentSource: observable,
      importType: observable,
      step: observable,
      showImportModal: action,
      setPaymentSource: action,
      hideImportModal: action,
      setImportType: action,
      setBenevityData: action,
    })
  }

  showImportModal = () => {
    this.isImportModalOpen = true
  }

  hideImportModal = () => {
    this.isImportModalOpen = false
    this.importType = 'none'
    this.selectedRecord = { id: '' }
    this.benevityData = benevityInitialValues
    this.step = 0
  }

  setSelectedRecord = (record: typeof this.selectedRecord) => {
    this.selectedRecord = record
  }

  setPaymentSource = (source: SelectedPaymentSource) => {
    this.paymentSource = source
  }

  setStep = (step: number) => {
    this.step = step
  }

  setImportType = (type: TImportType) => {
    this.importType = type
    this.step = 1
  }
  setBenevityData = (data: TBenevityCSVParser) => {
    this.step = 2
    this.benevityData = data
  }
}

export const CreatePaymentStore = new BenevityImportStoreImpl()
