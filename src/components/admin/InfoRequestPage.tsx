import React from 'react'
import { Container } from '@mui/material'

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
