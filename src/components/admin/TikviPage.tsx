import React from 'react'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'

import TikviGrid from './TikviGrid'

export default function TikviPage() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <TikviGrid />
      </Container>
    </Layout>
  )
}
