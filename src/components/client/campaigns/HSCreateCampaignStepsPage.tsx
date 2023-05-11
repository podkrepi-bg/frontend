import { Box } from '@mui/material'
import { useTranslation } from 'next-i18next'

import React from 'react'
import Layout from 'components/client/layout/Layout'
import CustomHorizontalStepper from './CustomHorizontalStepper'
import HSCreateForm from './stepOne/HSCreateForm'

import { CampaignContext, CampaignProvider } from 'context/create-campaign'
import CampaignStepper from './CampaignStepper'

export default function HSCreateCampaignStepsPage() {
  return (
    <Layout>
      <Box>
        <CampaignProvider>
          <CustomHorizontalStepper />
        </CampaignProvider>
      </Box>
    </Layout>
  )
}
