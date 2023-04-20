import { Box } from '@mui/material'

import React from 'react'
import Layout from 'components/client/layout/Layout'
import CreateCampaignSteps from './CreateCampaignSteps'
import CreateCampaignUserType from './CreateCampaignUserType'

export default function CreateCampaignPage() {
  return (
    <Layout>
      <Box>
        <CreateCampaignSteps />
      </Box>
      <Box mt={6}>
        <CreateCampaignUserType />
      </Box>
    </Layout>
  )
}
