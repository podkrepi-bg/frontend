import { action, makeObservable, observable } from 'mobx'

import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImplementation {
  isDrawerOpen = true

  constructor() {
    makeObservable(this, {
      isDrawerOpen: observable,
      openDrawer: action,
      closeDrawer: action,
    })
  }

  openDrawer = () => {
    this.isDrawerOpen = true
  }

  closeDrawer = () => {
    this.isDrawerOpen = false
  }
}

export const DrawerStore = new DrawerStoreImplementation()
