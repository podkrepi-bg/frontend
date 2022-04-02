import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

type Record = {
  id: string
  name: string
}
class ModalStoreImpl {
  isDetailsOpen = false
  isDeleteOpen = false
  selectedRecord: Record = {
    id: '',
    name: '',
  }

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      selectedRecord: observable,
      setSelectedRecord: action,
      showDetails: action,
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

  setSelectedRecord = (record: Record) => {
    this.selectedRecord = record
  }
}

export const ModalStore = new ModalStoreImpl()
