import React from 'react'
import { Container } from '@material-ui/core'

import Layout from 'components/layout/Layout'

import InfoRequestGrid from './InfoRequestGrid'

export default function InfoRequestPage() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <InfoRequestGrid />
      </Container>
    </Layout>
  )
}
