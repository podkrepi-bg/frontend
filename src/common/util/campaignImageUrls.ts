import getConfig from 'next/config'
import { CampaignResponse } from 'gql/campaigns'

const { publicRuntimeConfig } = getConfig()

export function campaignListPictureUrl(campaign: CampaignResponse): string {
  const campaignListPhoto = campaign.campaignFiles.find((x) => x.role == 'campaignListPhoto')
  if (campaignListPhoto) {
    return `${publicRuntimeConfig.API_URL}/api/campaign-file/${campaignListPhoto.id}`
  }
  return '/podkrepi-icon.svg'
}

export function backgroundCampaignPictureUrl(campaign: CampaignResponse): string {
  const background = campaign.campaignFiles.find((x) => x.role == 'background')
  if (background) {
    return `${publicRuntimeConfig.API_URL}/api/campaign-file/${background.id}`
  }
  return '/img/campaign-banner.png'
}
