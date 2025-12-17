import getConfig from 'next/config'
import { CampaignFile, CampaignResponse } from 'gql/campaigns'
import { CampaignFileRole, ImageSlider } from 'components/common/campaign-file/roles'
import { API_URL } from 'service/apiClient'

export function fileUrl(file: CampaignFile) {
  return `${API_URL}/campaign-file/${file.id}`
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
function filterFilesWithRole(campaign: CampaignResponse, role: CampaignFileRole[]) {
  return campaign.campaignFiles.filter((file) => role.includes(file.role))
}

export function campaignSliderUrls(campaign: CampaignResponse): ImageSlider[] {
  const sliderImageRoles = [CampaignFileRole.campaignPhoto, CampaignFileRole.gallery]
  const files = filterFilesWithRole(campaign, sliderImageRoles)
  const fileExtensionRemoverRegex = /.\w*$/
  return files.map((file) => {
    return {
      id: file.id,
      src: `${API_URL}/campaign-file/${file.id}`,
      fileName: file.filename.replace(fileExtensionRemoverRegex, ''),
    }
  })
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
