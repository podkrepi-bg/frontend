import { useState, createContext, SetStateAction, Dispatch } from 'react'

export interface AllTypesUsed {
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>
  notificationMessage: string
  setNotificationMessage: any
  notificationsOpen: boolean
  isOpen: boolean
  changeHandler(): void
}

export const DrawerContext = createContext<AllTypesUsed | null>(null)

function DrawerContextProvider(props: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [notificationMessage, setNotificationMessage] = useState<string>('')
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)

  const changeHandler = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const dataValue: AllTypesUsed = {
    setNotificationMessage,
    notificationMessage,
    setNotificationsOpen,
    notificationsOpen,
    isOpen,
    changeHandler,
  }

  return <DrawerContext.Provider value={dataValue}>{props.children}</DrawerContext.Provider>
}

export default DrawerContextProvider
