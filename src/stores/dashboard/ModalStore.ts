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
  //CAR SELECTED POSITIVE
  csPositive = () => {
    this.carSelected = true
  }
  //CAR SELECTED NEGATIVE
  csNegative = () => {
    this.carSelected = false
  }

  // Modal
  closeModal = () => {
    this.isModalOpen = false
  }
  openModal = () => {
    this.isModalOpen = true
  }
  //Confirmation Modal
  openCfrm = () => {
    this.cfrmOpen = true
  }
  closeCfrm = () => {
    this.cfrmOpen = false
  }
  //setCarId for the modal.
  setCarId = (rowId: string) => {
    this.carId = rowId
  }
}

export const ModalStore = new ModalContextImpl()
