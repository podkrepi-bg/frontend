import { default as TagManager, TagManagerArgs } from 'react-gtm-module'

const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? 'GTM-TWQBXM6'

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
