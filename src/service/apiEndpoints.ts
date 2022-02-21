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
  documents: {
    documentsList: <Endpoint>{ url: '/document', method: 'GET' },
    getDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'GET' },
    createDocument: <Endpoint>{ url: '/document', method: 'POST' },
    editDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'PUT' },
    deleteDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'DELETE' },
    deleteDocuments: <Endpoint>{ url: '/document/delete-many', method: 'POST' },
  },
  bankAccounts: {
    bankAccountList: <Endpoint>{ url: '/bankaccount', method: 'GET' },
    viewBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'GET' },
    deleteBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'DELETE' },
    postBankAccount: <Endpoint>{ url: '/bankaccount', method: 'POST' },
    editBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'PATCH' },
    deleteManyBankAccounts: <Endpoint>{ url: `/bankaccount/deletemany`, method: 'POST' },
  },
  country: {
    listCountries: <Endpoint>{ url: '/country/list', method: 'GET' },
    createCountry: <Endpoint>{ url: '/country/create-country', method: 'POST' },
    viewCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'GET' },
    editCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'PATCH' },
    deleteCountry: (id: string) => <Endpoint>{ url: `/country/${id}`, method: 'DELETE' },
  },
  coordinators: {
    coordinatorsList: <Endpoint>{ url: '/coordinator/list', method: 'GET' },
    viewCoordinator: (id: string) => <Endpoint>{ url: `/coordinator/${id}`, method: 'GET' },
    postCoordinator: <Endpoint>{ url: '/coordinator', method: 'POST' },
    deleteCoordinator: (id: string) => <Endpoint>{ url: `/coordinator/${id}`, method: 'DELETE' },
  },
}
