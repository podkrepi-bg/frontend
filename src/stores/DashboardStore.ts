import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DashboardStoreImpl {
  drawerOpen = true
  drawerSubOpen = true

  constructor() {
    makeObservable(this, {
      drawerOpen: observable,
      drawerSubOpen: observable,
      toggleDrawerOpen: action,
      toggleDrawerSubOpen: action,
    })
  }

  toggleDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }
  toggleDrawerSubOpen = () => {
    this.drawerSubOpen = !this.drawerSubOpen
  }
}

export const DashboardStore = new DashboardStoreImpl()
