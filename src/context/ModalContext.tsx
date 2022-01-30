import { useState, createContext } from 'react'
interface valueType {
  open: any
  setOpen: any
  carId: any
  setCarId: any
  search: any
  setSearch: any
  searchLoading: any
  setSearchLoading: any
}
export const ModalContext = createContext<valueType | null>(null)
function ModalContextProvider({ children }: any | null) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [carId, setCarId] = useState(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const dataValue: valueType = {
    open,
    setOpen,
    carId,
    setCarId,
    search,
    setSearch,
    searchLoading,
    setSearchLoading,
  }
  return <ModalContext.Provider value={dataValue}>{children}</ModalContext.Provider>
}
export default ModalContextProvider
