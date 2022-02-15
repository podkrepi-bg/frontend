import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = false
  subMenuIsOpen = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      subMenuIsOpen: observable,
      toggle: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleSubMenu = () => {
    this.subMenuIsOpen = !this.subMenuIsOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
