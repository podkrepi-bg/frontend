import { action, autorun, observable } from 'mobx'

export class ConfigStore {
  @observable isRefetch = false

  constructor() {
    this.load()
    autorun(this.save)
  }

  private save = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'isRefetch',
        JSON.stringify({
          isRefetch: this.isRefetch,
        }),
      )
    }
  }

  @action
  private load = () => {
    if (typeof window !== 'undefined') {
      Object.assign(this, JSON.parse(localStorage.getItem('isRefetch') || '{}'))
    }
  }

  @action
  changeIsRefetch = (isRefetch: boolean) => {
    this.isRefetch = isRefetch
    this.save()
    this.load()
  }
}

export default new ConfigStore()
