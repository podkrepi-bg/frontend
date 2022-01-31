import { useState, createContext, SetStateAction, Dispatch } from 'react'
export interface valueType {
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>
  setCarId: Dispatch<SetStateAction<string | null>>
  setOpen: Dispatch<SetStateAction<boolean>>
  notificationMessage: string
  setNotificationMessage: any
  notificationsOpen: boolean
  accordionExpanded: boolean
  confirmationOpen: boolean
  setAccordionExpanded: any
  areCarsSelected: boolean
  setConfirmationOpen: any
  setAreCarsSelected: any
  carId: string | null
  drawerOpen: boolean
  setDrawerOpen: any
  search: string
  setSearch: any
  open: boolean
}
export const ModalContext = createContext<valueType | null>(null)
function ModalContextProvider({ children }: any) {
  const [notificationMessage, setNotificationMessage] = useState<string>('')
  const [confirmationOpen, setConfirmationOpen] = useState<boolean>(false)
  const [accordionExpanded, setAccordionExpanded] = useState<boolean>(false)
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)
  const [areCarsSelected, setAreCarsSelected] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const [carId, setCarId] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const dataValue: valueType = {
    setNotificationMessage,
    notificationMessage,
    setAccordionExpanded,
    setNotificationsOpen,
    accordionExpanded,
    areCarsSelected,
    setAreCarsSelected,
    confirmationOpen,
    notificationsOpen,
    setConfirmationOpen,
    setDrawerOpen,
    drawerOpen,
    setSearch,
    setCarId,
    setOpen,
    search,
    carId,
    open,
  }
  return <ModalContext.Provider value={dataValue}>{children}</ModalContext.Provider>
}
export default ModalContextProvider
