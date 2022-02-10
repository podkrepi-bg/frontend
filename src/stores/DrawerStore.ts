import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true
  isSublistOpen = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      toggle: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleSublist = () => {
    this.isSublistOpen = !this.isSublistOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
