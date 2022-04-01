export enum CampaignFileRole {
  background = 'background',
  coordinator = 'coordinator',
  campaignPhoto = 'campaignPhoto',
  invoice = 'invoice',
  document = 'document',
  profilePhoto = 'profilePhoto',
  campaignListPhoto = 'campaignListPhoto',
}

export type FileRole = {
  file: string
  role: CampaignFileRole
}
