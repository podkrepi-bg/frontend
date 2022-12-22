export type CampaignData = {
  title: string
  slug: string
}[]

const localCampaignData: CampaignData = [
  {
    title: 'Sunt natus qui.',
    slug: 'sunt-natus-qui',
  },
  { title: 'Qui distinctio officia.', slug: 'qui-distinctio-officia' },
]

const stagingCampaignData: CampaignData = [
  {
    title: 'Училище за деца с нарушено зрение гр. Варна - стая за ерготерапия',
    slug: 'uchilishe-za-deca-s-narusheno-zrenie-gr-varna-staya-za-ergoterapiya',
  },
  {
    title: 'Кризисен център за пострадали от насилие - шанс за нов живот',
    slug: 'krizisen-centur-za-postradali-ot-nasilie-shans-za-nov-zhivot',
  },
]

export const campaignData = process.env.STAGING ? stagingCampaignData : localCampaignData
