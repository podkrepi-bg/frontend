import { useState, createContext, Dispatch, SetStateAction } from 'react'

interface valueType {
  open: any
  setOpen: any
  carId: any
  setCarId: any
}
export const ModalContext = createContext<valueType | null>(null)

function ModalContextProvider({ children }: any | null) {
  const [open, setOpen] = useState(false)
  const [carId, setCarId] = useState(null)
  const dataValue: valueType = {
    open,
    setOpen,
    carId,
    setCarId,
  }
  return <ModalContext.Provider value={dataValue}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
