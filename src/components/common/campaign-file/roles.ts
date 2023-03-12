export enum CampaignFileRole {
  background = 'background',
  coordinator = 'coordinator',
  campaignPhoto = 'campaignPhoto',
  invoice = 'invoice',
  document = 'document',
  profilePhoto = 'profilePhoto',
  campaignListPhoto = 'campaignListPhoto',
  beneficiaryPhoto = 'beneficiaryPhoto',
  organizerPhoto = 'organizerPhoto',
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
