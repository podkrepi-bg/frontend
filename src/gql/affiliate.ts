import { DonationResponse } from './donations'

enum AffilisteStatus {
  active = 'active',
  cancelled = 'cancelled',
  rejected = 'rejected',
  pending = 'pending',
}

export type AffiliateResponse = {
  id: string
  status: AffilisteStatus
  affiliateCode: string
  companyId: string
}

export type AffiliateWithDonationResponse = AffiliateResponse & {
  donations: DonationResponse[]
}

export type CancelAffiliateDonation = {
  donationId: string
  affiliateCode: string
}
