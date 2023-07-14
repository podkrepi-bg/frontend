import Script from 'next/script'
import getConfig from 'next/config'

export default function HotJar() {
  const { publicRuntimeConfig } = getConfig()

  if (typeof window !== undefined && typeof window.hj === 'function') {
    return null
  }
  return <Script async src={`${publicRuntimeConfig.APP_URL}/js/hotJarLib.js`} />
}
