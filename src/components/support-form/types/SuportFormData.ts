export type SupportFormData = {
  terms: boolean
  info: {
    email: string
    name: string
    phone: string
    address: string
  }
  roles: {
    benefactor: boolean
    partner: boolean
    volunteer: boolean
    associationMember: boolean
    promoter: boolean
  }
  benefactor: {
    campaignBenefactor: boolean
    platformBenefactor: boolean
  } | {}
  partner: {
    npo: boolean
    bussiness: boolean
    other: boolean
    otherText: string
  } | {}
  volunteer: {
    areas: Array<string>
  } | {}
  associationMember: {
    isMember: boolean
  } | {}
  promoter: {
    mediaPartner: boolean
    ambassador: boolean
    other: boolean
    otherText: string
  } | {}
}
