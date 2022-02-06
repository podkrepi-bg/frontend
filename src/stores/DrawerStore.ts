import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DrawerStoreImpl {
  isOpen = true
  companySubMenu = false

  constructor() {
    makeObservable(this, {
      isOpen: observable,
      companySubMenu: observable,
      toggle: action,
    })
  }

  toggle = () => {
    this.isOpen = !this.isOpen
  }

  toggleCompanySubMenu = () => {
    this.companySubMenu = !this.companySubMenu
  }
}

export const DrawerStore = new DrawerStoreImpl()
