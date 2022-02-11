import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

class ModalStoreImpl {
  isDetailsOpen = false
  isDeleteOpen = false
  isDeleteAllOpen = false

  constructor() {
    makeObservable(this, {
      isDetailsOpen: observable,
      isDeleteOpen: observable,
      showDetails: action,
      hideDetails: action,
      showDelete: action,
      hideDelete: action,
      showDeleteAll: action,
      hideDeleteAll: action,
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

  showDeleteAll = () => {
    this.isDeleteAllOpen = true
  }

  hideDeleteAll = () => {
    this.isDeleteAllOpen = false
  }
}

export const ModalStore = new ModalStoreImpl()
