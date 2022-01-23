import React from 'react'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'
import DetailsModal from './DetailsModal'
import CarsGrid from './CarsGrid'
import CarsInput from './CarsInput'

export default function CarsPage(props: any) {
  return (
    <Layout>
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#305bbf', opacity: '0.8' }}>Vehicles</h1>
        <CarsInput></CarsInput>
        <DetailsModal></DetailsModal>
        <Container maxWidth="lg">
          <CarsGrid />
        </Container>
      </div>
    </Layout>
  )
}
