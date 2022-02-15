import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class DashboardStoreImpl {
  drawerOpen = true
  drawerCompact = false
  drawerEntityOpen = true
  drawerCountryOpen = false

  constructor() {
    makeObservable(this, {
      drawerOpen: observable,
      drawerCompact: observable,
      drawerEntityOpen: observable,
      drawerCountryOpen: observable,
      toggleDrawerOpen: action,
      toggleDrawerCompact: action,
      toggleDrawerEntityOpen: action,
      toggleDrawerCountryOpen: action,
    })
  }

  toggleDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }
  toggleDrawerCompact = () => {
    this.drawerCompact = !this.drawerCompact
  }
  toggleDrawerEntityOpen = () => {
    this.drawerEntityOpen = !this.drawerEntityOpen
  }
  toggleDrawerCountryOpen = () => {
    this.drawerCountryOpen = !this.drawerCountryOpen
  }
}

export const DashboardStore = new DashboardStoreImpl()
