import getConfig from 'next/config'
import { default as TagManager, TagManagerArgs } from 'react-gtm-module'

const gtmId = getConfig().publicRuntimeConfig.GTM_ID

export type EventType = 'change_language' | 'page_view'

export type DataEvent = { event: EventType; [key: string]: unknown }

export default function useGTM() {
  return {
    gtmId,
    initialize: (params?: Partial<TagManagerArgs>) => TagManager.initialize({ gtmId, ...params }),
    trackEvent: (dataLayer: DataEvent, dataLayerName?: string) => {
      TagManager.dataLayer({ dataLayer, dataLayerName })
    },
  }
}
