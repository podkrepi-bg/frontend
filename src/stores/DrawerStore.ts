import { makeAutoObservable } from 'mobx'

export default class UserStore {
  isDrawerOpen = false
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
