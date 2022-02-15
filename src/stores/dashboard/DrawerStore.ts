import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isDrawerOpen = true
  accordionOpen = false

  constructor() {
    makeObservable(this, {
      isDrawerOpen: observable,
      accordionOpen: observable,
      openDrawer: action,
      closeDrawer: action,
    })
  }

  closeDrawer = () => {
    this.isDrawerOpen = false
  }
  openDrawer = () => {
    this.isDrawerOpen = true
  }

  toggleAccordion = () => {
    this.accordionOpen = !this.accordionOpen
  }
}

export const DrawerStore = new DrawerStoreImpl()
