import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

type Record = {
  id: string
}
export class RefundStoreImpl {
  isRefundOpen = false
  selectedRecord: Record = {
    id: '',
  }

  constructor() {
    makeObservable(this, {
      isRefundOpen: observable,
      selectedRecord: observable,
      showRefund: action,
      hideRefund: action,
    })
  }

  showRefund = () => {
    console.log('refund open')
    this.isRefundOpen = true
  }

  hideRefund = () => {
    this.isRefundOpen = false
  }

  setSelectedRecord = (record: Record) => {
    this.selectedRecord = record
  }
}

export const RefundStore = new RefundStoreImpl()
