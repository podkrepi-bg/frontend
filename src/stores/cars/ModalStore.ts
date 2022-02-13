import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class ModalContextImpl {
  isModalOpen = false
  cfrmOpen = false
  carId = ''
  carSelected = false
  constructor() {
    makeObservable(this, {
      isModalOpen: observable,
      cfrmOpen: observable,
      carId: observable,
      carSelected: observable,
      openModal: action,
      closeModal: action,
      openCfrm: action,
      closeCfrm: action,
      setCarId: action,
      csPositive: action,
      csNegative: action,
    })
  }

  csPositive = () => {
    this.carSelected = true
  }

  csNegative = () => {
    this.carSelected = false
  }

  closeModal = () => {
    this.isModalOpen = false
  }
  openModal = () => {
    this.isModalOpen = true
  }

  openCfrm = () => {
    this.cfrmOpen = true
  }
  closeCfrm = () => {
    this.cfrmOpen = false
  }

  setCarId = (rowId: string) => {
    this.carId = rowId
  }
}

export const ModalStore = new ModalContextImpl()
