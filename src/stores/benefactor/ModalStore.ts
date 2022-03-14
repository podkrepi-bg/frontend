import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class ModalStoreImpl {
  isDetailsOpen = false
  isDeleteOpen = false
  isDeleteAllOpen = false
  isSelected = false

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      isDeleteAllOpen: observable,
      isSelected: observable,
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
}
export const ModalStore = new ModalStoreImpl()
