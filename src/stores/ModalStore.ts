import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

class ModalStoreImpl {
  isOpen = false
  isCfrmOpen = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      isCfrmOpen: observable,
      show: action,
      hide: action,
      showCfrm: action,
      hideCfrm: action,
    })
  }

  show = () => {
    this.isOpen = true
  }

  hide = () => {
    this.isOpen = false
  }

  showCfrm = () => {
    this.isCfrmOpen = true
  }

  hideCfrm = () => {
    this.isCfrmOpen = false
  }
}

export const ModalStore = new ModalStoreImpl()
