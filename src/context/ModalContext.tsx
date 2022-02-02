import { useState, createContext, SetStateAction, Dispatch } from 'react'
export interface valueType {
  setCarId: Dispatch<SetStateAction<string | null>>
  setOpen: Dispatch<SetStateAction<boolean>>
  confirmationOpen: boolean
  areCarsSelected: boolean
  setConfirmationOpen: Dispatch<SetStateAction<boolean>>
  setAreCarsSelected: Dispatch<SetStateAction<boolean>>
  carId: string | null
  open: boolean
}
export const ModalContext = createContext<valueType | null>(null)
function ModalContextProvider({ children }: any) {
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [areCarsSelected, setAreCarsSelected] = useState(false)
  const [carId, setCarId] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const dataValue: valueType = {
    areCarsSelected,
    setAreCarsSelected,
    confirmationOpen,
    setConfirmationOpen,
    setCarId,
    setOpen,
    carId,
    open,
  }
  return <ModalContext.Provider value={dataValue}>{children}</ModalContext.Provider>
}
export default ModalContextProvider
