import getConfig from 'next/config'
import { CampaignFile } from 'gql/campaigns'
import { CampaignFileRole, ImageSlider } from 'components/common/campaign-file/roles'

const { publicRuntimeConfig } = getConfig()

export function fileUrl(file: CampaignFile) {
  return `${publicRuntimeConfig.API_URL}/campaign-file/${file.id}`
}

/**
 * Finds first file with given role
 */
function findFileWithRole(campaignFile: CampaignFile[], role: CampaignFileRole) {
  return campaignFile?.find((file) => file.role == role)
}

/**
 * Finds all files with given role
 */
function filterFilesWithRole(campaignFile: CampaignFile[], role: CampaignFileRole[]) {
  return campaignFile.filter((file) => role.includes(file.role))
}

export function campaignSliderUrls(campaignFile: CampaignFile[]): ImageSlider[] {
  const sliderImageRoles = [CampaignFileRole.campaignPhoto, CampaignFileRole.gallery]
  const files = filterFilesWithRole(campaignFile, sliderImageRoles)
  const fileExtensionRemoverRegex = /.\w*$/
  return files.map((file) => {
    return {
      id: file.id,
      src: `${publicRuntimeConfig.API_URL}/campaign-file/${file.id}`,
      fileName: file.filename.replace(fileExtensionRemoverRegex, ''),
    }
  })
}

export function campaignListPictureUrl(campaignFile: CampaignFile[]): string {
  const file = findFileWithRole(campaignFile, CampaignFileRole.campaignListPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.svg'
}

export function backgroundCampaignPictureUrl(campaignFile: CampaignFile[]): string {
  const file = findFileWithRole(campaignFile, CampaignFileRole.background)
  return file ? fileUrl(file) : '/img/campaign-banner.png'
}

export function coordinatorCampaignPictureUrl(campaignFile: CampaignFile[]): string {
  const file = findFileWithRole(campaignFile, CampaignFileRole.coordinator)
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}

export function organizerCampaignPictureUrl(campaignFile: CampaignFile[]): string {
  const file = findFileWithRole(campaignFile, CampaignFileRole.organizerPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}

export function beneficiaryCampaignPictureUrl(campaignFile: CampaignFile[]): string {
  const file = findFileWithRole(campaignFile, CampaignFileRole.beneficiaryPhoto)
  return file ? fileUrl(file) : '/podkrepi-icon.png'
}
