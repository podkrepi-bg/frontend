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
    <Layout
      githubUrl="https://github.com/podkrepi-bg/frontend/tree/master/src/components/campaigns/CampaignsPage.tsx"
      figmaUrl="https://www.figma.com/file/MmvFKzUv6yE5U2wrOpWtwS/Podkrepi.bg?node-id=5100%3A21216">
      <div> in development</div>
    </Layout>
  )
}
