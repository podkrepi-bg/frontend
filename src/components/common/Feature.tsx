import { PropsWithChildren } from 'react'
import { Typography } from '@mui/material'

import Layout from 'components/layout/Layout'
import { featureFlagEnabled, Features } from 'common/util/featureFlag'

export { Features }

type Props = PropsWithChildren<{ name: Features }>
export default function Feature({ name, children }: Props) {
  if (featureFlagEnabled(name)) {
    return <>{children}</>
  }

  // Add custom 'In development' page below
  return (
    <Layout>
      <Typography variant="h3" component="h1" textAlign="center">
        in development
      </Typography>
    </Layout>
  )
}
