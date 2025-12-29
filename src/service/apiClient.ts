import Axios from 'axios'
import LRU from 'lru-cache'
import { makeUseAxios } from 'axios-hooks'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { NEXT_PUBLIC_API_URL },
} = getConfig()

export const API_URL = NEXT_PUBLIC_API_URL

const cache = new LRU({ max: 10 })
export const apiClient = Axios.create({ baseURL: `${API_URL}` })

export const useAxios = makeUseAxios({
  axios: apiClient,
  cache,
  defaultOptions: {
    ssr: true,
    manual: false,
    useCache: true,
    autoCancel: true,
  },
})
