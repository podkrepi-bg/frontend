import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig() || {}

export enum Features {
  CAMPAIGN = 'CAMPAIGN',
  DUAL_CURRENCY = 'DUAL_CURRENCY',
}
export const featureFlagEnabled = (flagName: Features): boolean => {
  return Boolean(publicRuntimeConfig?.FEATURE_ENABLED?.[flagName])
}
