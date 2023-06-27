export enum CampaignFileRole {
  background = 'background',
  coordinator = 'coordinator',
  campaignPhoto = 'campaignPhoto',
  invoice = 'invoice',
  gallery = 'gallery',
  document = 'document',
  profilePhoto = 'profilePhoto',
  campaignListPhoto = 'campaignListPhoto',
  beneficiaryPhoto = 'beneficiaryPhoto',
  organizerPhoto = 'organizerPhoto',
}

export enum CampaignNewsFileRole {
  invoice = 'invoice',
  gallery = 'gallery',
  document = 'document',
}

export type FileRole = {
  file: string
  role: CampaignFileRole
}

export type UploadCampaignFiles = {
  campaignId: string
  files: File[]
  roles: FileRole[]
}

export type UploadCampaignNewsFiles = {
  articleId: string
  files: File[]
  roles: FileRole[]
}
