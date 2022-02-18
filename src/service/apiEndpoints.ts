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
  // person: {
  //   createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
  // },
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
  bankAccounts: {
    bankAccountList: <Endpoint>{ url: '/bankaccount', method: 'GET' },
    viewBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'GET' },
    deleteBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'DELETE' },
    postBankAccount: <Endpoint>{ url: '/bankaccount', method: 'POST' },
    editBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'PATCH' },
    deleteManyBankAccounts: <Endpoint>{ url: `/bankaccount/deletemany`, method: 'POST' },
  },
  beneficiary: {
    listBeneficiary: <Endpoint>{ url: '/beneficiary/list', method: 'GET' },
    viewBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    editBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'PUT' },
    removeBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'DELETE' },
  },
  person: {
    list: <Endpoint>{ url: '/person', method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    viewPerson: (slug: string) => <Endpoint>{ url: '/person/' + slug, method: 'GET' },
    createPerson: <Endpoint>{ url: '/person', method: 'POST' },
    removemany: <Endpoint>{ url: '/person/deletemany', method: 'DELETE' },
  },
}
