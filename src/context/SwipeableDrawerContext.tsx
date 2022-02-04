import { useState, createContext, SetStateAction, Dispatch } from 'react'

export interface AllTypesUsed {
  setNotificationsOpen: Dispatch<SetStateAction<boolean>>
  notificationMessage: string
  setNotificationMessage: Dispatch<SetStateAction<string>>
  notificationsOpen: boolean
}

export const DrawerContext = createContext<AllTypesUsed | null>(null)

function DrawerContextProvider(props: any) {
  const [notificationMessage, setNotificationMessage] = useState<string>('')
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false)

  const dataValue: AllTypesUsed = {
    setNotificationMessage,
    notificationMessage,
    setNotificationsOpen,
    notificationsOpen,
  }

  return <DrawerContext.Provider value={dataValue}>{props.children}</DrawerContext.Provider>
}

export default DrawerContextProvider
