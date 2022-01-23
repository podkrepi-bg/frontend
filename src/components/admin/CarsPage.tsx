import React from 'react'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'

import CarsGrid from './CarsGrid'

export default function CarsPage() {
  return (
    <Layout>
      <Container maxWidth="lg">
        <CarsGrid />
      </Container>
    </Layout>
  )
}
