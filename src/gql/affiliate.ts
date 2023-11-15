import { DonationResponse } from './donations'

export enum AffiliateStatus {
  active = 'active',
  cancelled = 'cancelled',
  rejected = 'rejected',
  pending = 'pending',
}

export type AffiliateResponse = {
  id: string
  status: AffiliateStatus
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

export type AffiliatesAdminResponse = AffiliateResponse & {
  company: {
    companyName: string
    companyNumber: string
    person: {
      firstName: string
      lastName: string
      email: string
    }
  }
}
