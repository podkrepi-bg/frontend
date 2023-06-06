import { CampaignNewsFile } from 'gql/campaign-news'
import { CampaignFileRole } from 'components/common/campaign-file/roles'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function GetArticleDocuments(files: CampaignNewsFile[]) {
  const fileExtensionRemoverRegex = /.\w*$/
  return files
    .filter(
      (file) => file.role === CampaignFileRole.invoice || file.role === CampaignFileRole.document,
    )
    .map((file) => {
      return {
        id: file.id,
        fileUrl: `${publicRuntimeConfig.API_URL}/campaign-news-file/${file.id}`,
        fileName: file.filename.replace(fileExtensionRemoverRegex, ''),
      }
    })
}

export function GetArticleGalleryPhotos(files: CampaignNewsFile[]) {
  return files
    .filter((file) => file.role === CampaignFileRole.campaignPhoto)
    .map((file) => {
      return {
        id: file.id,
        imgSource: `${publicRuntimeConfig.API_URL}/campaign-news-file/${file.id}`,
      }
    })
}
