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
  benefactor:
    | {
        campaignBenefactor: boolean
        platformBenefactor: boolean
      }
    | any
  partner:
    | {
        npo: boolean
        bussiness: boolean
        other: boolean
        otherText: string
      }
    | any
  volunteer:
    | {
        areas: Array<string>
      }
    | any
  associationMember:
    | {
        isMember: boolean
      }
    | any
  promoter:
    | {
        mediaPartner: boolean
        ambassador: boolean
        other: boolean
        otherText: string
      }
    | any
}
