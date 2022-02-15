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
  city: {
    listCities: <Endpoint>{ url: '/city/list', method: 'GET' },
  },
  company: {
    createCompany: <Endpoint>{ url: '/company/create-company', method: 'POST' },
    listCompanies: <Endpoint>{ url: '/company/list', method: 'GET' },
    deleteCompany: (slug: string) => <Endpoint>{ url: `/company/${slug}`, method: 'DELETE' },
    editCompany: (slug: string) => <Endpoint>{ url: `/company/${slug}`, method: 'PATCH' },
    deleteMany: <Endpoint>{ url: '/company/delete-many', method: 'POST' },
  },
}
