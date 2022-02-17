/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Container } from '@mui/material'

import Layout from './layout/Layout'
import CityGridHeading from './layout/CityGridHeading'
import CityGrid from './CityGrid'

export default function CityPage() {
  return (
    <Layout>
      <Container
        maxWidth={false}
        sx={{
          borderRadius: '13px',
          minHeight: 'calc(100vh - 64px)',
          position: 'relative',
          background: '#e9f6ff',
          width: '100%',
        }}>
        <Container sx={{ pt: '24px' }} disableGutters maxWidth={false}>
          <CityGridHeading />
          <CityGrid />
        </Container>
      </Container>
    </Layout>
  )
}
