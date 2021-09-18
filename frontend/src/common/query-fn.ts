import getConfig from 'next/config'
import { QueryFunction } from 'react-query'

const {
  publicRuntimeConfig: { API_URL },
} = getConfig()

export const queryFn: QueryFunction = async function ({ queryKey }) {
  const resp = await fetch(`${API_URL}/api${queryKey[0]}`)
  return resp.json()
}
