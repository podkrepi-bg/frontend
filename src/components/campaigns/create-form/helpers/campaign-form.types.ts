export type Step = {
  component: JSX.Element
}

export enum Steps {
  NONE = -1,
  COORDINATORTYPE = 0,
  COORDINATOR = 1,
  INFO = 2,
  DETAILS = 3,
  FINISH = 4,
}

export enum CoordinatorTypes {
  Person = 'person',
  Company = 'company',
}

export enum CoordinatorBeneficiaryRealation {
  Related = 'related',
  NotRelated = 'notRelated',
}

export enum CampaignDateTypes {
  AmountReached = 'amountReached',
  Continuous = 'continuous',
  SelectDate = 'selectDate',
}

export type CoordinatorPersonFormData = {
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

export type CoordinatorCompanyFormData = {
  companyName: string
  companyNumber: string
  address: string
  email: string
  phone: string
  legalPersonFirstName: string
  legalPersonMidName: string
  legalPersonLastName: string
}

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
  coordinator: CoordinatorTypes | string | undefined
  coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
  coordinatorPerson: CoordinatorPersonFormData
  coordinatorCompany: CoordinatorCompanyFormData
  beneficiaryPerson: BeneficiaryPersonFormData
  beneficiaryCompany: BeneficiaryCompanyFormData
  beneficiaryName: string
  campaignInfo: CampaignInfoFormData
  campaignDetails: CampaignDetailsFormData
}

export type CampaignFormDataSteps = {
  [Steps.NONE]: never
  [Steps.COORDINATORTYPE]: {
    coordinator: CoordinatorTypes | string | undefined
  }
  [Steps.COORDINATOR]: {
    coordinator: CoordinatorTypes | string | undefined
    coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
    coordinatorPerson: CoordinatorPersonFormData
    coordinatorCompany: CoordinatorCompanyFormData
    beneficiaryPerson: BeneficiaryPersonFormData
    beneficiaryCompany: BeneficiaryCompanyFormData
  }
  [Steps.INFO]: {
    coordinatorBeneficiaryRelation: CoordinatorBeneficiaryRealation
    beneficiaryName: string
    campaignInfo: CampaignInfoFormData
  }
  [Steps.DETAILS]: {
    campaignDetails: CampaignDetailsFormData
  }
}
