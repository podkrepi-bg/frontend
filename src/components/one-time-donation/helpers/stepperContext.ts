import { createContext } from 'react'
import { CampaignResponse } from 'gql/campaigns'

export const StepsContext =
  createContext<
    | {
        step: number
        setStep: React.Dispatch<React.SetStateAction<number>>
        campaign: CampaignResponse
      }
    | undefined
  >(undefined)
