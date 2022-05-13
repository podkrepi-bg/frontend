import { createContext } from 'react'
import { CampaignResponse } from 'gql/campaigns'

type Steps = {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  campaign: CampaignResponse
}
export const StepsContext = createContext<Steps>({} as Steps)
