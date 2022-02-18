import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true
  isSublistOpen = false
  isProfileOpen = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      isSublistOpen: observable,
      isProfileOpen: observable,
      toggle: action,
      toggleSublist: action,
      toggleProfile: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleSublist = () => {
    this.isSublistOpen = !this.isSublistOpen
  }

  toggleProfile = () => {
    this.isProfileOpen = !this.isProfileOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
