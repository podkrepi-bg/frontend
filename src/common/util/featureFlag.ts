import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export enum Features {
  CAMPAIGN = 'CAMPAIGN',
}
export const featureFlagEnabled = (flagName: Features): boolean => {
  return Boolean(publicRuntimeConfig.FEATURE_ENABLED[flagName])
}
