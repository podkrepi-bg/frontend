import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DashboardStoreImpl {
  drawerOpen = true
  drawerEntityOpen = true
  drawerCountryOpen = false

  constructor() {
    makeObservable(this, {
      drawerOpen: observable,
      drawerEntityOpen: observable,
      drawerCountryOpen: observable,
      toggleDrawerOpen: action,
      toggleDrawerEntityOpen: action,
      toggleDrawerCountryOpen: action,
    })
  }

  toggleDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }
  toggleDrawerEntityOpen = () => {
    this.drawerEntityOpen = !this.drawerEntityOpen
  }
  toggleDrawerCountryOpen = () => {
    this.drawerCountryOpen = !this.drawerCountryOpen
  }
}

export const DashboardStore = new DashboardStoreImpl()
