import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true
  isFullClosed = false
  companySubMenu = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      companySubMenu: observable,
      isFullClosed: observable,
      toggle: action,
      toggleCompanySubMenu: action,
      toggleFullClosed: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleCompanySubMenu = () => {
    this.companySubMenu = !this.companySubMenu
  }

  toggleFullClosed = () => {
    this.isFullClosed = !this.isFullClosed
  }
}

export const DrawerStore = new DrawerStoreImpl()
