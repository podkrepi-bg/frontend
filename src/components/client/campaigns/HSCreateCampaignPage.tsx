import { Box, Grid, Button } from '@mui/material'
import { CategoryType } from 'gql/types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import React from 'react'
import Layout from 'components/client/layout/Layout'
import CreateCampaignSteps from './CreateCampaignSteps'
import CreateCampaignUserType from './CreateCampaignUserType'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// TODO: MOBILE VIEW
export default function CreateCampaignPage() {
  const { t } = useTranslation('campaigns')
  const router = useRouter()

  const userTypeHandler = (user: CategoryType) => {
    // TODO: store the selection on redirect
    console.log('selected user type: ', user)
  }

  const goToNextPage = () => router.push('/campaigns/create/steps')
  const goBackToPrevPage = () => router.back()

  return (
    <Layout minHeight="auto">
      <Box>
        <CreateCampaignSteps />
      </Box>
      <Box mt={6}>
        <CreateCampaignUserType onClick={userTypeHandler} />
      </Box>
      <Box mt={6}>
        <Grid container spacing={3} justifyContent="flex-start" alignItems="center">
          <Grid item>
            <Button onClick={goBackToPrevPage} variant="outlined">
              {t('back')}
            </Button>
          </Grid>

          <Grid item>
            <Button onClick={goToNextPage} variant="contained" endIcon={<ChevronRightIcon />}>
              {t('next')}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  )
}
