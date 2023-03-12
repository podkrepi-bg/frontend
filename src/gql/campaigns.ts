import { UUID } from './types'
import type { CampaignFileRole } from 'components/common/campaign-file/roles'
import type { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { Currency } from './currency'
import { PaymentProvider } from './donations.enums'
import { CampaignState } from 'components/client/campaigns/helpers/campaign.enums'
import { BeneficiaryType } from '../components/admin/beneficiary/BeneficiaryTypes'
import { VaultResponse } from './vault'

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
  organizerId: UUID | undefined
  campaignTypeId: UUID
  description: string
  targetAmount: number
  allowDonationOnComplete: boolean
  currency: string
  startDate?: Date
  endDate?: Date
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}

export type AdminCampaignResponse = BaseCampaignResponse & {
  campaignType: {
    name: string
    slug: string
  }
  beneficiary: {
    id: UUID
    type: BeneficiaryType
    publicData: string
    person: { id: UUID; firstName: string; lastName: string }
    company: { id: UUID; companyName: string }
  }
  coordinator: {
    person: { firstName: string; lastName: string }
  }
  organizer?: {
    person: { firstName: string; lastName: string }
  }
  summary: {
    reachedAmount: number
    currentAmount: number
    blockedAmount: number
    withdrawnAmount: number
  }
  vaults: { id: UUID }[]
  category: CampaignTypeCategory
}

export type AdminSingleCampaignResponse = CampaignResponse & {
  incomingTransfers: { amount: number }[]
  vaults: { amount: number }[]
}

export type CampaignResponse = BaseCampaignResponse & {
  campaignType: {
    name: string
    category: CampaignTypeCategory
    slug: string
  }
  summary: { reachedAmount: number; donors?: number }
  beneficiary: {
    id: UUID
    type: BeneficiaryType
    publicData: string
    person: { id: UUID; firstName: string; lastName: string }
    company: { id: UUID; companyName: string }
  }
  coordinator: {
    id: UUID
    person: { id: UUID; firstName: string; lastName: string; email: string }
  }
  organizer?: {
    id: UUID
    person: { id: UUID; firstName: string; lastName: string; email: string }
  }
  campaignFiles?: CampaignFile[]
  vaults?: VaultResponse[]
  defaultVault?: UUID
}

export type CampaignCreateFormData = {
  title: string
  slug?: string | undefined
  campaignTypeId: string
  beneficiaryId: string
  coordinatorId: string
  organizerId: string
  targetAmount: number
  allowDonationOnComplete?: boolean
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  state: CampaignState
  description: string
  terms: boolean
  gdpr: boolean
}

export type CampaignAdminCreateFormData = CampaignCreateFormData & {
  currency: Currency
}

export type CampaignEditFormData = {
  title: string
  slug: string
  campaignTypeId: string
  beneficiaryId: string
  coordinatorId: string
  organizerId: string
  targetAmount: number
  allowDonationOnComplete?: boolean
  startDate: Date | string | undefined
  endDate: Date | string | undefined
  state: CampaignState
  description: string
  campaignFiles: CampaignFile[]
  currency: Currency
}

export type CampaignInput = {
  title: string
  slug: string
  description: string
  essence: string
  campaignTypeId: UUID
  beneficiaryId: UUID
  coordinatorId: UUID
  organizerId: UUID
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

export type CampaignDonationHistoryResponse = {
  items: CampaignDonation[]
  total: number
}
