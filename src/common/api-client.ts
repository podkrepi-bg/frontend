import Axios from 'axios'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

export const apiBackend = Axios.create({ baseURL: `${API_URL}/api` })

export const apiFrontend = Axios.create({ baseURL: `/api` })
