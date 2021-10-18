import React from 'react'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import SupportersGrid from './SupportersGrid'

export default function SupportersPage() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <SupportersGrid />
      </Container>
    </Layout>
  )
}
