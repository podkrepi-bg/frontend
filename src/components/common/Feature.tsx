import { PropsWithChildren } from 'react'
import getConfig from 'next/config'

import Layout from 'components/layout/Layout'

type FeatureProps = PropsWithChildren<{ name: Features }>

export enum Features {
  CAMPAIGN = 'CAMPAIGN',
}

export default function Feature({ name, children }: FeatureProps) {
  const { publicRuntimeConfig } = getConfig()
  const isFeatureEnabled = publicRuntimeConfig.FEATURE_ENABLED[name]
  const isProduction = process.env.APP_ENV === 'production'

  if (isFeatureEnabled || !isProduction) {
    return <>{children}</>
  }

  //Add custom 'In development' page below
  return (
    <Layout>
      <div> in development</div>
    </Layout>
  )
}
