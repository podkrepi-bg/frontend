import getConfig from 'next/config'
import { CampaignFile, CampaignResponse } from 'gql/campaigns'
import { CampaignFileRole } from 'components/common/campaign-file/roles'

const { publicRuntimeConfig } = getConfig()

export function fileUrl(file: CampaignFile) {
  return `${publicRuntimeConfig.API_URL}/campaign-file/${file.id}`
}

/**
 * Finds first file with given role
 */
function findFileWithRole(campaign: CampaignResponse, role: CampaignFileRole) {
  return campaign?.campaignFiles?.find((file) => file.role == role)
}

/**
 * Finds all files with given role
 */
function filterFilesWithRole(campaign: CampaignResponse, role: CampaignFileRole) {
  return campaign?.campaignFiles?.filter((file) => file.role == role)
}

export function campaignSliderUrls(campaign: CampaignResponse): string[] {
  const files = filterFilesWithRole(campaign, CampaignFileRole.campaignPhoto)
  if (files && files.length > 0) {
    return files.map((file) => fileUrl(file))
  }
  return []
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
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}

export function organizerCampaignPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.organizerPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}

export function beneficiaryCampaignPictureUrl(campaign: CampaignResponse): string {
  const file = findFileWithRole(campaign, CampaignFileRole.beneficiaryPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}
