export enum Features {
  CAMPAIGN = 'CAMPAIGN',
  DUAL_CURRENCY = 'DUAL_CURRENCY',
}

const featureEnvMap: Record<Features, string | undefined> = {
  [Features.CAMPAIGN]: process.env.NEXT_PUBLIC_FEATURE_CAMPAIGN,
  [Features.DUAL_CURRENCY]: process.env.NEXT_PUBLIC_FEATURE_DUAL_CURRENCY,
}

export const featureFlagEnabled = (flagName: Features): boolean => {
  return Boolean(featureEnvMap[flagName])
}
