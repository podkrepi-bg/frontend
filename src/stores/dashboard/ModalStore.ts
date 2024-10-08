import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

type Record = {
  id: string
  name: string
}
export class ModalStoreImpl {
  isDetailsOpen = false
  isDeleteOpen = false
  isPaymentImportOpen = false
  selectedRecord: Record = {
    id: '',
    name: '',
  }

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      selectedRecord: observable,
      isPaymentImportOpen: observable,
      setSelectedRecord: action,
      showDetails: action,
      showImport: action,
      hideDetails: action,
      showDelete: action,
      hideDelete: action,
    })
  }

  showDetails = () => {
    this.isDetailsOpen = true
  }

  hideDetails = () => {
    this.isDetailsOpen = false
  }

  showDelete = () => {
    this.isDeleteOpen = true
  }

  hideDelete = () => {
    this.isDeleteOpen = false
  }

  showImport = () => {
    this.isPaymentImportOpen = true
  }

  hideImport = () => {
    this.isPaymentImportOpen = false
  }
  setSelectedRecord = (record: Record) => {
    this.selectedRecord = record
  }
}

export const ModalStore = new ModalStoreImpl()
