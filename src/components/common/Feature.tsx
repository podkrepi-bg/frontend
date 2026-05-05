import { PropsWithChildren } from 'react'
import { Typography } from '@mui/material'
import { useSession } from 'next-auth/react'

import Layout from 'components/client/layout/Layout'
import { featureEnabledForSession, Features } from 'common/util/featureFlag'

export { Features }

type Props = PropsWithChildren<{ name: Features }>
export default function Feature({ name, children }: Props) {
  const { data: session } = useSession()

  if (featureEnabledForSession(name, session)) {
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
