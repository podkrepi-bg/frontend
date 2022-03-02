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
  isDeleteAllOpen = false
  isSelected = false
  selectedRecord: Record = {
    id: '',
    name: '',
  }
  selectedIdsToDelete: string[] = []

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      isDeleteAllOpen: observable,
      isSelected: observable,
      selectedRecord: observable,
      selectedIdsToDelete: observable,
      setSelectedRecord: action,
      setSelectedIdsToDelete: action,
      selectedPositive: action,
      selectedNegative: action,
      showDetails: action,
      hideDetails: action,
      showDelete: action,
      hideDelete: action,
      showDeleteAll: action,
      hideDeleteAll: action,
    })
  }

  selectedPositive = () => {
    this.isSelected = true
  }

  selectedNegative = () => {
    this.isSelected = false
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

  showDeleteAll = () => {
    this.isDeleteAllOpen = true
  }

  hideDeleteAll = () => {
    this.isDeleteAllOpen = false
  }

  setSelectedRecord = (record: Record) => {
    this.selectedRecord = record
  }

  setSelectedIdsToDelete = (ids: string[]) => {
    this.selectedIdsToDelete = ids
  }
}

export const ModalStore = new ModalStoreImpl()
