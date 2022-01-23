import { useRouter } from 'next/router'
import { useState, createContext } from 'react'
interface valueType {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}
export const ModalContext = createContext<valueType | null>(null)

function ModalContextProvider({ children }: any | null) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const openModal = (): void => {
    setIsOpen(true)
  }
  const closeModal = (): void => {
    setIsOpen(false)
  }

  const modalData: valueType = {
    isOpen,
    openModal,
    closeModal,
  }

  return <ModalContext.Provider value={modalData}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
