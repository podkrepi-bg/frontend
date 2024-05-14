import { ArticleStatus } from 'components/admin/campaign-news/helpers/article-status.enum'
import { CampaignFileRole } from 'components/common/campaign-file/roles'
import { UUID } from './types'
import { CampaignTypeCategory } from 'components/common/campaign-types/categories'
import { CampaignFile } from './campaigns'

type BaseCampaignNewsResponse = {
  id: UUID
  campaignId: UUID
  publisherId: UUID
  title: string
  slug: string
  author: string
  state: ArticleStatus
  sourceLink: string | undefined
  createdAt: Date
  publishedAt: Date
  editedAt: Date | undefined
  description: string
  newsFiles: CampaignNewsFile[] | []
  campaignType: {
    name: string
  }
}

export type AdminCampaignNewsResponse = BaseCampaignNewsResponse & {
  campaign: {
    title: string
  }
}

export type CampaignNewsResponse = Omit<BaseCampaignNewsResponse, 'createdAt' | 'editedAt'> & {
  campaign: {
    id: string
    title: string
    state: string
    slug: string
    campaignType: {
      category: CampaignTypeCategory
    }
    campaignFiles: CampaignFile[]
  }
}

export type CampaignNewsListResponse = Omit<CampaignNewsResponse, 'description'>

export type CampaignNewsPagination = {
  currentPage: number
  nextPage: number
  prevPage: number
  totalPages: number
}

export type CampaignNewsWithPaginationResponse = {
  campaign: {
    campaignNews: CampaignNewsListResponse[]
  }
  pagination: CampaignNewsPagination
}

export type CampaignNewsFile = {
  id: UUID
  filename: string
  mimetype: string
  articleId: UUID
  personId: UUID
  role: CampaignFileRole
}

export type CampaignNewsAdminCreateFormData = {
  title: string
  slug: string | undefined
  campaignId: UUID
  author: string | undefined
  sourceLink: string | undefined
  description: string
  terms: boolean
  gdpr: boolean
  notify: boolean
}

export type CampaignNewsInput = {
  title: string
  slug: string
  campaignId: UUID
  author: string | undefined
  sourceLink: string | undefined
  description: string
  state: ArticleStatus
  notify: boolean
}
