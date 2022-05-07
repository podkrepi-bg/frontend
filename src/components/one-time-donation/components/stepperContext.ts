import { CampaignResponse } from 'gql/campaigns'
import { createContext } from 'react'

export const StepsContext =
  createContext<
    | {
        step: number
        setStep: React.Dispatch<React.SetStateAction<number>>
        campaign: CampaignResponse
      }
    | undefined
  >(undefined)
