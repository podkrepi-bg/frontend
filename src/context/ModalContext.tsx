import { useState, createContext, Dispatch, SetStateAction } from 'react'

interface valueType {
  carData: any
  setData: Dispatch<SetStateAction<never[]>>
}
export const ModalContext = createContext<valueType | null>(null)

function ModalContextProvider({ children }: any | null) {
  const [carData, setData] = useState([])

  const dataValue: valueType = {
    carData,
    setData,
  }
  return <ModalContext.Provider value={dataValue}>{children}</ModalContext.Provider>
}

export default ModalContextProvider
