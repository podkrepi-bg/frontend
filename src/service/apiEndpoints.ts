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
    userDonations: <Endpoint>{ url: 'donation/user-donations', method: 'GET' },
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
  city: {
    createCity: <Endpoint>{ url: '/city/create', method: 'POST' },
    citiesList: <Endpoint>{ url: '/city/list', method: 'GET' },
    viewCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'GET' },
    editCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'PATCH' },
    deleteCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'DELETE' },
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
  vaults: {
    vaultsList: <Endpoint>{ url: '/vault', method: 'GET' },
    getVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'GET' },
    createVault: <Endpoint>{ url: '/vault', method: 'POST' },
    editVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'PUT' },
    deleteVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'DELETE' },
    deleteVaults: <Endpoint>{ url: '/vault/delete-many', method: 'POST' },
  },
  beneficiary: {
    listBeneficiary: <Endpoint>{ url: '/beneficiary/list/', method: 'GET' },
    viewBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    editBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'PUT' },
    removeBeneficiary: (id: string) => <Endpoint>{ url: '/beneficiary/' + id, method: 'DELETE' },
    removeMany: <Endpoint>{ url: '/beneficiary/delete-many', method: 'POST' },
  },
  campaignTypes: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-types/', method: 'GET' },
    viewCampaignType: (id: string) => <Endpoint>{ url: '/campaign-types/' + id, method: 'GET' },
    createCampaignType: <Endpoint>{ url: '/campaign-types', method: 'POST' },
    editCampaignType: (id: string) => <Endpoint>{ url: '/campaign-types/' + id, method: 'PUT' },
    removeCampaignType: (id: string) =>
      <Endpoint>{ url: '/campaign-types/' + id, method: 'DELETE' },
    removeMany: <Endpoint>{ url: '/campaign-types/delete-many', method: 'POST' },
  },
  person: {
    list: <Endpoint>{ url: '/person', method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    viewPerson: (slug: string) => <Endpoint>{ url: '/person/' + slug, method: 'GET' },
    createPerson: <Endpoint>{ url: '/person', method: 'POST' },
    removemany: <Endpoint>{ url: '/person/deletemany', method: 'DELETE' },
  },
  company: {
    list: <Endpoint>{ url: '/company/list', method: 'GET' },
    viewCompany: (slug: string) => <Endpoint>{ url: '/company/' + slug, method: 'GET' },
  },
}
