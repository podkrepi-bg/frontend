import { enableStaticRendering } from 'mobx-react'
import { action, computed, makeObservable, observable } from 'mobx'
import { CityType } from 'gql/city'

enableStaticRendering(typeof window === 'undefined')

interface Dialog {
  id: number
  show: boolean
  title?: string
  row: CityType
}

export class DialogStoreImpl {
  dialogs: Dialog[] = []

  constructor() {
    makeObservable(this, {
      dialogs: observable,
      show: action,
      hide: action,
      clear: action,
      getDialogs: computed,
    })
  }

  show(row: CityType, title?: string) {
    this.clear()
    const dialog: Dialog = {
      id: +new Date(),
      show: true,
      row,
      title,
    }
    this.dialogs.push(dialog)
  }

  hide() {
    if (this.dialogs.length > 0) this.dialogs[0].show = false
  }

  clear() {
    this.dialogs = []
  }

  get getDialogs() {
    return this.dialogs
  }
}

export const DeleteModalStore = new DialogStoreImpl()
