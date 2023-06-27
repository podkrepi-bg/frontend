import { UseMutationResult } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { CampaignFileRole, UploadCampaignFiles } from 'components/common/campaign-file/roles'
import { CampaignUploadImage } from 'gql/campaigns'
import { ApiErrors } from 'service/apiErrors'
import crypto from 'crypto'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

/**
 * This function finds all base64 image links in the given string, uploads them to the server
 * and replaces them with the podkrepi.bg server links.
 */
export const base64ImageUploader = async function (
  textWithLinks: string,
  campaignId: string,
  fileUploadMutation: UseMutationResult<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignFiles,
    unknown
  >,
): Promise<string> {
  const urlPromises: Promise<string>[] = []

  //this is a replacer function that will be called for each base64 image
  const getReplacementUrls = async (
    _matchedBase64: string,
    imageType: string,
    base64Data: string,
  ) => {
    //upload the imageData to the server and get the url
    const fileUrl = await uploadImage(campaignId, base64Data, imageType, fileUploadMutation)
    return fileUrl
  }

  //now call the replacer to upload all images and return the urls
  const base64regex = /data:image\/(png|jpg|jpeg|gif);base64,([^"]+)/g
  textWithLinks.replaceAll(base64regex, (m, p1, p2) => {
    urlPromises.push(getReplacementUrls(m, p1, p2))
    return ''
  })

  //and wait on all replacement promisses in the array and run the replacer again with the returned urls
  return Promise.all(urlPromises).then((urls) => {
    textWithLinks = textWithLinks.replaceAll(base64regex, () => urls.shift() as string)
    return textWithLinks
  })
}

//upload image to server and return the url
async function uploadImage(
  campaignId: string,
  base64Data: string,
  imageType: string,
  fileUploadMutation: UseMutationResult<
    AxiosResponse<CampaignUploadImage[]>,
    AxiosError<ApiErrors>,
    UploadCampaignFiles,
    unknown
  >,
): Promise<string> {
  const imageBuffer = Buffer.from(base64Data, 'base64')

  //we don't know the name so we hash the image for unique name to avoid uploading the same image twice
  const fileName = crypto.createHash('sha256').update(imageBuffer).digest('hex') + '.' + imageType
  const imageFile = new File([imageBuffer], fileName, { type: 'image/' + imageType })

  return await fileUploadMutation
    .mutateAsync({
      campaignId: campaignId,
      files: [imageFile],
      roles: [{ file: imageFile.name, role: CampaignFileRole.campaignPhoto }],
    })
    .then((response) => {
      return `${publicRuntimeConfig.APP_URL}/api/v1/campaign-file/` + response.data[0]
    })
    .catch(() => {
      return ''
    })
}
