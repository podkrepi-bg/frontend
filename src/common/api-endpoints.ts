import { Method } from 'axios'

type Endpoint = {
  url: string
  method: Method
}

export const endpoints = {
  campaign: {
    createCampaign: <Endpoint>{ url: '/campaign/create-campaign', method: 'POST' },
  },
  support: {
    createInfoRequest: <Endpoint>{ url: '/support/create-inquiry', method: 'POST' },
    createSupportRequest: <Endpoint>{ url: '/support/create-request', method: 'POST' },
    supportRequestList: <Endpoint>{ url: '/support/support-request/list', method: 'GET' },
    infoRequestList: <Endpoint>{ url: '/support/info-request/list', method: 'GET' },
  },
}
