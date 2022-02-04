import { Method } from 'axios'

type Endpoint = {
  url: string
  method: Method
}

export const endpoints = {
  campaign: {
    listCampaigns: <Endpoint>{ url: '/campaign/list', method: 'GET' },
    createCampaign: <Endpoint>{ url: '/campaign/create-campaign', method: 'POST' },
    viewCampaign: (slug: string) => <Endpoint>{ url: `/campaign/${slug}`, method: 'GET' },
  },
  campaignType: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-type/list', method: 'GET' },
  },
  person: {
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
  },
  support: {
    createInfoRequest: <Endpoint>{ url: '/support/create-inquiry', method: 'POST' },
    createSupportRequest: <Endpoint>{ url: '/support/create-request', method: 'POST' },
    supportRequestList: <Endpoint>{ url: '/support/support-request/list', method: 'GET' },
    infoRequestList: <Endpoint>{ url: '/support/info-request/list', method: 'GET' },
  },
  donation: {
    prices: <Endpoint>{ url: '/donation/prices', method: 'GET' },
    singlePrices: <Endpoint>{ url: '/donation/prices/single', method: 'GET' },
    recurringPrices: <Endpoint>{ url: '/donation/prices/recurring', method: 'GET' },
    createCheckoutSession: <Endpoint>{ url: '/donation/create-checkout-session', method: 'POST' },
  },
  bootcamp: {
    listBootcampers: <Endpoint>{ url: '/bootcamp', method: 'GET' },
    viewBootcamper: (slug: string) => <Endpoint>{ url: '/bootcamp/' + slug, method: 'GET' },
    createBootcamper: <Endpoint>{ url: '/bootcamp', method: 'POST' },
    removeBootcamper: (slug: string) => <Endpoint>{ url: `/bootcamp/${slug}`, method: 'DELETE' },
  },
  city: {
    listCities: <Endpoint>{ url: '/city/list', method: 'GET' },
    createCity: <Endpoint>{ url: '/city/create', method: 'POST' },
    viewCity: (slug: string) => <Endpoint>{ url: '/city/view/' + slug, method: 'GET' },
    editCity: (slug: string) => <Endpoint>{ url: '/city/edit/' + slug, method: 'PUT' },
    deleteCity: (slug: string) => <Endpoint>{ url: '/city/remove' + slug, method: 'DELETE' },
  },
  campaignTypes: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-types/list', method: 'GET' },
    createCampaignType: <Endpoint>{ url: '/campaign-types/add', method: 'POST' },
    viewCampaignType: (slug: string) =>
      <Endpoint>{ url: '/campaign-types/view/' + slug, method: 'GET' },
    editCampaignType: (slug: string) =>
      <Endpoint>{ url: '/campaign-types/edit/' + slug, method: 'PUT' },
    deleteCampaignType: (slug: string) =>
      <Endpoint>{ url: '/campaign-types/remove' + slug, method: 'DELETE' },
  },
}
