import React from 'react'
import { useTranslation } from 'next-i18next'
import { Container } from '@mui/material'

import Layout from 'components/bootcamps/layout/Layout'
import BootcampCreateForm from './BootcampCreateForm'

// import CampaignForm from './CampaignForm'

export default function CreateBootcampPage() {
  const { t } = useTranslation()

  return (
    <Drawer ></Drawer >
    <Container maxWidth="sm">
      <BootcampCreateForm />
    </Container>

  )
}
