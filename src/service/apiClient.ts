import Axios from 'axios'
import LRU from 'lru-cache'
import getConfig from 'next/config'
import { makeUseAxios } from 'axios-hooks'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const cache = new LRU({ max: 10 })
export const apiClient = Axios.create({ baseURL: `${API_URL}/api` })

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
