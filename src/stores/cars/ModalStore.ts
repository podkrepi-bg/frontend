import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class ModalContextImpl {
  isModalOpen: boolean = false
  cfrmOpen: boolean = false
  carSelected: boolean = false
  carId: string | number = ''

  constructor() {
    makeObservable(this, {
      isModalOpen: observable,
      cfrmOpen: observable,
      carSelected: observable,
      carId: observable,
      openModal: action,
      closeModal: action,
      openCfrm: action,
      closeCfrm: action,
      setCarId: action,
    })
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
  // Checks if there are multiple cars selected
  csPositive = () => {
    this.carSelected = true
  }
  csNegative = () => {
    this.carSelected = false
  }
  //setCarId for the modal.
  setCarId = (rowId: string | number) => {
    this.carId = rowId
  }
}

export const ModalStore = new ModalContextImpl()
