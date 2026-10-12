import { DonationType } from './donations.enums'

export type DonationWishInput = {
  message: string
  campaignId: UUID
  personId?: UUID
  donationId?: UUID
  paymentIntentId?: UUID
}

export type DonationWishResponse = {
  id: UUID
  message: string
  campaignId: UUID
  donationId?: UUID
  personId?: UUID
  person?: { firstName: string; lastName: string; company: { companyName: string } }
  donation?: { amount: number; currency: string; type: DonationType; metadata: { name: string } }
  createdAt: DateTime
}

export type DonationWishPaginatedResponse = {
  items: DonationWishResponse[]
  totalCount: number
}

export type DonationWithWishResponse = {
  id: UUID
  type: DonationType
  amount: number
  currency: string
  createdAt: DateTime
  person: { firstName: string; lastName: string; company: { companyName: string } | null } | null
  metadata: { name: string | null } | null
  wish: { id: UUID; message: string; createdAt: DateTime } | null
}

export type DonationWithWishPaginatedResponse = {
  items: DonationWithWishResponse[]
  totalCount: number
}
