import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      toggle: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
