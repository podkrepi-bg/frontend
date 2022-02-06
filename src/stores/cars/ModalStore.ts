import { action, makeObservable, observable } from 'mobx'
import { enableStaticRendering } from 'mobx-react'

enableStaticRendering(typeof window === 'undefined')

export class ModalContextImpl {
  isModalOpen: boolean = false
  cfrmOpen: boolean = false
  carId: string = ''

  constructor() {
    makeObservable(this, {
      isModalOpen: observable,
      cfrmOpen: observable,
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
  //setCarId for the modal.
  setCarId = (rowId: string) => {
    this.carId = rowId
  }
}

export const ModalStore = new ModalContextImpl()
