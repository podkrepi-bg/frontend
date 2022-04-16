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
    viewCampaignById: (id: string) => <Endpoint>{ url: `/campaign/byId/${id}`, method: 'GET' },
    editCampaign: (id: string) => <Endpoint>{ url: `/campaign/${id}`, method: 'PUT' },
    deleteCampaign: (id: string) => <Endpoint>{ url: `/campaign/${id}`, method: 'DELETE' },
    deleteCampaigns: <Endpoint>{ url: '/campaign/deletemany', method: 'POST' },
    uploadFile: (campaignId: string) =>
      <Endpoint>{ url: `/campaign-file/${campaignId}`, method: 'POST' },
    getDonations: (id: string) => <Endpoint>{ url: `/campaign/donations/${id}`, method: 'GET' },
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
    createDonation: <Endpoint>{ url: '/donation/create-payment', method: 'POST' },
    donationsList: <Endpoint>{ url: '/donation/list', method: 'GET' },
    getDonation: (id: string) => <Endpoint>{ url: `/donation/${id}`, method: 'GET' },
    editDonation: (id: string) => <Endpoint>{ url: `/donation/${id}`, method: 'PATCH' },
    deleteDonation: <Endpoint>{ url: `/donation/delete`, method: 'POST' },
    userDonations: <Endpoint>{ url: 'donation/user-donations', method: 'GET' },
  },
  documents: {
    documentsList: <Endpoint>{ url: '/document', method: 'GET' },
    getDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'GET' },
    createDocument: <Endpoint>{ url: '/document', method: 'POST' },
    editDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'PUT' },
    deleteDocument: (slug: string) => <Endpoint>{ url: `/document/${slug}`, method: 'DELETE' },
  },
  bankAccounts: {
    bankAccountList: <Endpoint>{ url: '/bankaccount', method: 'GET' },
    createBankAccount: <Endpoint>{ url: '/bankaccount', method: 'POST' },
    viewBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'GET' },
    editBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'PATCH' },
    deleteBankAccount: (id: string) => <Endpoint>{ url: `/bankaccount/${id}`, method: 'DELETE' },
  },
  city: {
    createCity: <Endpoint>{ url: '/city/create', method: 'POST' },
    citiesList: <Endpoint>{ url: '/city/list', method: 'GET' },
    viewCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'GET' },
    editCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'PATCH' },
    deleteCity: (id: string) => <Endpoint>{ url: `/city/${id}`, method: 'DELETE' },
  },
  withdrawals: {
    withdrawalsList: <Endpoint>{ url: '/withdrawal', method: 'GET' },
    getWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'GET' },
    createWithdrawal: <Endpoint>{ url: '/withdrawal', method: 'POST' },
    editWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'PUT' },
    deleteWithdrawal: (id: string) => <Endpoint>{ url: `/withdrawal/${id}`, method: 'DELETE' },
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
  expenses: {
    listExpenses: <Endpoint>{ url: '/expenses/list', method: 'GET' },
    createExpense: <Endpoint>{ url: '/expenses/create-expense', method: 'POST' },
    viewExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'GET' },
    editExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'PATCH' },
    deleteExpense: (id: string) => <Endpoint>{ url: `/expenses/${id}`, method: 'DELETE' },
  },
  benefactor: {
    benefactorList: <Endpoint>{ url: '/benefactor', method: 'GET' },
    getBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'GET' },
    createBenefactor: <Endpoint>{ url: '/benefactor', method: 'POST' },
    editBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'PATCH' },
    deleteBenefactor: (id: string) => <Endpoint>{ url: `/benefactor/${id}`, method: 'DELETE' },
  },
  vaults: {
    vaultsList: <Endpoint>{ url: '/vault', method: 'GET' },
    getVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'GET' },
    createVault: <Endpoint>{ url: '/vault', method: 'POST' },
    editVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'PUT' },
    deleteVault: (slug: string) => <Endpoint>{ url: `/vault/${slug}`, method: 'DELETE' },
  },
  beneficiary: {
    listBeneficiary: <Endpoint>{ url: '/beneficiary/list', method: 'GET' },
    viewBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    editBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'PUT' },
    removeBeneficiary: (id: string) => <Endpoint>{ url: `/beneficiary/${id}`, method: 'DELETE' },
  },
  campaignTypes: {
    listCampaignTypes: <Endpoint>{ url: '/campaign-types/', method: 'GET' },
    viewCampaignType: (id: string) => <Endpoint>{ url: `/campaign-types/${id}`, method: 'GET' },
    createCampaignType: <Endpoint>{ url: '/campaign-types', method: 'POST' },
    editCampaignType: (id: string) => <Endpoint>{ url: `/campaign-types/${id}`, method: 'PUT' },
    removeCampaignType: (id: string) =>
      <Endpoint>{ url: `/campaign-types/${id}`, method: 'DELETE' },
  },
  person: {
    list: <Endpoint>{ url: '/person', method: 'GET' },
    createBeneficiary: <Endpoint>{ url: '/beneficiary/create-beneficiary', method: 'POST' },
    viewPerson: (slug: string) => <Endpoint>{ url: `/person/${slug}`, method: 'GET' },
    createPerson: <Endpoint>{ url: '/person', method: 'POST' },
    removemany: <Endpoint>{ url: '/person/deletemany', method: 'DELETE' },
  },
  company: {
    list: <Endpoint>{ url: '/company/list', method: 'GET' },
    viewCompany: (slug: string) => <Endpoint>{ url: `/company/${slug}`, method: 'GET' },
  },
  transfer: {
    listTransfer: <Endpoint>{ url: '/transfer/', method: 'GET' },
    viewTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'GET' },
    createTransfer: <Endpoint>{ url: '/transfer/create', method: 'POST' },
    editTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'PUT' },
    removeTransfer: (id: string) => <Endpoint>{ url: `/transfer/${id}`, method: 'DELETE' },
  },
  account: {
    me: <Endpoint>{ url: '/account/me', method: 'GET' },
    update: <Endpoint>{ url: '/account/me', method: 'PATCH' },
  },
}
