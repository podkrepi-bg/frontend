import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

export const useStores = () => {
  return useContext(MobXProviderContext)
}
