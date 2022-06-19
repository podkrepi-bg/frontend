import { UUID } from './types'
import type { CampaignFileRole } from 'components/campaign-file/roles'
import type { CampaignTypeCategory } from 'components/campaign-types/categories'
import { Currency } from './currency'
import { PaymentProvider } from './donations'
import { CampaignState } from 'components/campaigns/helpers/campaign.enums'

export type CampaignType = {
  id: UUID
  category: CampaignTypeCategory
  name: string
  slug: string
  parentId: UUID
  description: string
}

export type CampaignFile = {
  id: UUID
  filename: string
  mimetype: string
  campaignId: UUID
  personId: UUID
  role: CampaignFileRole
}

type BaseCampaignResponse = {
  id: UUID
  state: CampaignState
  slug: string
  title: string
  essence: string
  paymentReference: string
  coordinatorId: UUID
  beneficiaryId: UUID
  campaignTypeId: UUID
  description: string
  targetAmount: number
  allowDonationOnComplete: boolean
  currency: string
  startDate: Date | null
  endDate: Date | null
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type AdminCampaignResponse = BaseCampaignResponse & {
  campaignType: {
    name: string
  }
  beneficiary: {
    person: { firstName: string; lastName: string }
  }
  coordinator: {
    person: { firstName: string; lastName: string }
  }
  incomingTransfers: { amount: number }[]
  outgoingTransfers: { amount: number }[]
  summary: { reachedAmount: number }[]
}

export type CampaignResponse = BaseCampaignResponse & {
  campaignType: {
    name: string
    category: CampaignTypeCategory
  }
  summary: { reachedAmount: number; donors?: number }[]
  beneficiary: {
    id: UUID
    type: string
    publicData: string
    person: { id: UUID; firstName: string; lastName: string }
  }
  coordinator: {
    id: UUID
    person: { id: UUID; firstName: string; lastName: string }
  }
  campaignFiles?: CampaignFile[]
}

export type CampaignCreateFormData = {
  title: string
  campaignTypeId: string
  beneficiaryId: string
  coordinatorId: string
  targetAmount: number
  allowDonationOnComplete?: boolean
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  state: CampaignState
  description: string
  terms: boolean
  gdpr: boolean
}

export type CampaignEditFormData = {
  title: string
  campaignTypeId: string
  beneficiaryId: string
  coordinatorId: string
  targetAmount: number
  allowDonationOnComplete?: boolean
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  state: CampaignState
  description: string
  campaignFiles: CampaignFile[]
}

export type CampaignInput = {
  title: string
  slug: string
  description: string
  essence: string
  campaignTypeId: UUID
  beneficiaryId: UUID
  coordinatorId: UUID
  targetAmount: number
  allowDonationOnComplete?: boolean
  currency: string
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  state: CampaignState
}

export type CampaignUploadImage = {
  title: string
}

export type CampaignDonation = {
  id: UUID
  type: string
  status: string
  provider: PaymentProvider
  targetVaultId: UUID
  extCustomerId: UUID
  extPaymentIntentId: UUID
  extPaymentMethodId: UUID
  createdAt: string
  updatedAt: string | undefined
  amount: number
  currency: Currency
  personId: UUID
  person: {
    firstName: string
    lastName: string
  }
}
