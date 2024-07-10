import { CampaignApplicationFormData } from 'components/client/campaign-application/helpers/campaignApplication.types'

export type CampaignApplicationAdminEdit = CampaignApplicationFormData & {
  status: string
  ticketUrl?: string
}
