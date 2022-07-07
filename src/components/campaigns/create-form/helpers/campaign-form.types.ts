export type Step = {
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  ORGANIZER = 0,
  BENEFICIARYTYPE = 1,
  BENEFICIARY = 2,
  INFO = 3,
  DETAILS = 4,
  FINISH = 5,
}

export enum BeneficiaryTypes {
  Person = 'person',
  Company = 'company',
}

export enum OrganizerBeneficiaryRelation {
  Related = 'related',
  NotRelated = 'notRelated',
}

export enum CampaignDateTypes {
  AmountReached = 'amountReached',
  Continuous = 'continuous',
  SelectDate = 'selectDate',
}

// export type CoordinatorPersonFormData = {
//   firstName: string
//   midName: string
//   lastName: string
//   email: string
//   phone: string
//   personalNumber: string
//   legalEntity?: boolean
//   companyName?: string
//   companyNumber?: string
//   legalPersonName?: string
//   address?: string
// }

export type OrganizerFormData = {
  firstName: string | undefined
  lastName: string | undefined
  email: string | undefined
  phone: string | undefined
}
export type BeneficiaryPersonFormData = {
  firstName: string
  midName: string
  lastName: string
  email: string
  phone: string
  personalNumber: string
  legalEntity?: boolean
  companyName?: string
  companyNumber?: string
  legalPersonName?: string
  address?: string
}

// export type CoordinatorCompanyFormData = {
//   companyName: string
//   companyNumber: string
//   address: string
//   email: string
//   phone: string
//   legalPersonFirstName: string
//   legalPersonMidName: string
//   legalPersonLastName: string
// }

export type BeneficiaryCompanyFormData = {
  companyName: string
  companyNumber: string
  address: string
  email: string
  phone: string
  legalPersonFirstName: string
  legalPersonMidName: string
  legalPersonLastName: string
}

export type CampaignInfoFormData = {
  campaignTypeId: string
  campaignTypeName: string
  targetAmount: number
  campaignDate: CampaignDateTypes
  endDate: Date | string
}

export type CampaignDetailsFormData = {
  description: string
  soFar: string
  aim: string
  homepageLink: string
  mediaLink: string
  facebook: string
  otherLinks: string
}

export type CampaignFormData = {
  organizer: OrganizerFormData
  beneficiaryType: BeneficiaryTypes
  beneficiaryPerson: BeneficiaryPersonFormData
  beneficiaryCompany: BeneficiaryCompanyFormData
  campaignInfo: CampaignInfoFormData
  campaignDetails: CampaignDetailsFormData
  organizerBeneficiaryRelation: OrganizerBeneficiaryRelation
}

export type CampaignFormDataSteps = {
  [Steps.NONE]: never
  [Steps.ORGANIZER]: {
    organizer: OrganizerFormData
  }
  [Steps.BENEFICIARYTYPE]: {
    beneficiaryType: BeneficiaryTypes
  }
  [Steps.BENEFICIARY]: {
    beneficiaryPerson: BeneficiaryPersonFormData
    beneficiaryCompany: BeneficiaryCompanyFormData
    organizerBeneficiaryRelation: OrganizerBeneficiaryRelation
  }
  [Steps.INFO]: {
    campaignInfo: CampaignInfoFormData
  }
  [Steps.DETAILS]: {
    campaignDetails: CampaignDetailsFormData
  }
}

// export type CampaignFormData = {
//   coordinator: CoordinatorTypes | string | undefined
//   coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
//   coordinatorPerson: CoordinatorPersonFormData
//   coordinatorCompany: CoordinatorCompanyFormData
//   beneficiaryPerson: BeneficiaryPersonFormData
//   beneficiaryCompany: BeneficiaryCompanyFormData
//   beneficiaryName: string
//   campaignInfo: CampaignInfoFormData
//   campaignDetails: CampaignDetailsFormData
// }

// export type CampaignFormDataSteps = {
//   [Steps.NONE]: never
//   [Steps.COORDINATORTYPE]: {
//     coordinator: CoordinatorTypes | string | undefined
//   }
//   [Steps.COORDINATOR]: {
//     coordinator: CoordinatorTypes | string | undefined
//     coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
//     coordinatorPerson: CoordinatorPersonFormData
//     coordinatorCompany: CoordinatorCompanyFormData
//     beneficiaryPerson: BeneficiaryPersonFormData
//     beneficiaryCompany: BeneficiaryCompanyFormData
//   }
//   [Steps.INFO]: {
//     coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
//     beneficiaryName: string
//     campaignInfo: CampaignInfoFormData
//   }
//   [Steps.DETAILS]: {
//     campaignDetails: CampaignDetailsFormData
//   }
// }
