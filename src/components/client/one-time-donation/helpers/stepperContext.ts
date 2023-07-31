import { createContext } from 'react'
import { CampaignResponse } from 'gql/campaigns'
import { OneTimeDonation } from 'gql/donations'

type Steps = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  campaign: CampaignResponse
  updateDonationSession: (value: OneTimeDonation, step: number) => void
  clearDonationSession: () => void
}
export const StepsContext = createContext<Steps>({} as Steps)
