import { makeAutoObservable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export default class UserStore {
  constructor() {
    makeAutoObservable(this)
  }
}
