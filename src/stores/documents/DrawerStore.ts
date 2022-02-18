import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true
  isProfileOpen = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      isProfileOpen: observable,
      toggle: action,
      toggleProfile: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleProfile = () => {
    this.isProfileOpen = !this.isProfileOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
