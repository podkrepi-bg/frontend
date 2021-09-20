import Axios from 'axios'
import LRU from 'lru-cache'
import getConfig from 'next/config'
import { makeUseAxios } from 'axios-hooks'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

const cache = new LRU({ max: 10 })
export const axios = Axios.create({ baseURL: `${API_URL}/api` })

export const useAxios = makeUseAxios({
  axios,
  cache,
  defaultOptions: {
    ssr: true,
    manual: false,
    useCache: true,
    autoCancel: true,
  },
})
