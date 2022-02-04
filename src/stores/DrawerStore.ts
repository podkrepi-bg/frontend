import { makeAutoObservable } from 'mobx'

export default class DrawerStore {
  isDrawerOpen = true
  constructor() {
    makeAutoObservable(this)
  }

  hide() {
    this.isDrawerOpen = false
  }

  show() {
    this.isDrawerOpen = true
  }
}
