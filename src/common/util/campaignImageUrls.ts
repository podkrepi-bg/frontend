import getConfig from 'next/config'
import { CampaignFile, CampaignResponse } from 'gql/campaigns'
import { CampaignFileRole } from 'components/campaign-file/roles'

const { publicRuntimeConfig } = getConfig()

export function fileUrl(file: CampaignFile) {
  return `${publicRuntimeConfig.API_URL}/campaign-file/${file.id}`
}

/**
 * Finds first file with given role
 */
function findFileWithRole(campaign: CampaignResponse, role: CampaignFileRole) {
  return campaign.campaignFiles?.find((file) => file.role == role)
}

export function campaignListPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.campaignListPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.svg'
}

export function backgroundCampaignPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.background)
  return file ? fileUrl(file) : '/img/campaign-banner.png'
}

export function coordinatorCampaignPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.coordinator)
  return file ? fileUrl(file) : '/img/support-us-image.png'
}

export function beneficiaryCampaignPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.beneficiaryPhoto)
  return file ? fileUrl(file) : '/img/support-us-image.png'
}
