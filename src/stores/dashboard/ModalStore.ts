import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

class ModalStoreImpl {
  isDetailsOpen = false
  isDeleteOpen = false
  isDeleteAllOpen = false
  isSelected = false
  idsToDelete: string[] = []

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      isDeleteAllOpen: observable,
      isSelected: observable,
      idsToDelete: observable,
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

  showDeleteAll = (idsToDelete: string[]) => {
    this.isDeleteAllOpen = true
    this.idsToDelete = idsToDelete
  }

  hideDeleteAll = () => {
    this.isDeleteAllOpen = false
  }
}

export const ModalStore = new ModalStoreImpl()
