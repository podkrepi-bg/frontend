import Script from 'next/script'
import getConfig from 'next/config'

interface HotJar extends Window {
  hj: object
}

declare const window: HotJar

export default function HotJar() {
  const { publicRuntimeConfig } = getConfig()

  if (typeof window !== undefined && typeof window.hj === 'function') {
    return null
  }
  return <Script async src={`${publicRuntimeConfig.APP_URL}/js/hotJarLib.js`} />
}
