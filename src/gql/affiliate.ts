import type { CompanyResponse } from './company'
import type { PaymentWithDonations } from './donations'

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
  company: CompanyResponse
}

export type AffiliateWithDonationResponse = AffiliateResponse & {
  payments: PaymentWithDonations[]
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
