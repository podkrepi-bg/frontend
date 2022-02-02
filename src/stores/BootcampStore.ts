import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class BootcampStoreImpl {
  navDrawerOpen = true
  navDrawerSubOpen = true

  constructor() {
    makeObservable(this, {
      navDrawerOpen: observable,
      navDrawerSubOpen: observable,
      toggleNavDrawerOpen: action,
      toggleNavDrawerSubOpen: action,
    })
  }

  toggleNavDrawerOpen = () => {
    this.navDrawerOpen = !this.navDrawerOpen
  }
  toggleNavDrawerSubOpen = () => {
    this.navDrawerSubOpen = !this.navDrawerSubOpen
  }
}

export const BootcampStore = new BootcampStoreImpl()
