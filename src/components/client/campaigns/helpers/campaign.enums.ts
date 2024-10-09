export enum CampaignState {
  draft = 'draft',
  active = 'active',
  partially_financed = 'partially_financed',
  suspended = 'suspended',
  complete = 'complete',
  blocked = 'blocked',
  paused = 'paused',
  deleted = 'deleted',
}

export const canAcceptDonationState = new Set([
  CampaignState.partially_financed,
  CampaignState.complete,
])

export enum StatisticsGroupBy {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}
