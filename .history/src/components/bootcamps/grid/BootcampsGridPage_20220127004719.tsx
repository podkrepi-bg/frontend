import React from 'react'
import { Container } from '@mui/material'

import Layout from 'components/layout/Layout'

import BootcampsGrid from './BootcampsGrid'
import BootcampForm from '../BootcampEditForm'

export default function BootcampsGridPage() {
  return (
    <Layout>
      <BootcampForm></BootcampForm>
      <Container maxWidth="lg">
        <BootcampsGrid />
      </Container>
    </Layout>
  )
}
