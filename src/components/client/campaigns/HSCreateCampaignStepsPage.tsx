import { Box, Grid, Button, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import React from 'react'
import Layout from 'components/client/layout/Layout'
import CustomHorizontalStepper from 'components/client/campaigns/CustomHorizontalStepper'

export default function HSCreateCampaignStepsPage() {
  const { t } = useTranslation()

  const steps = new Map([
    [
      0,
      {
        label: t('campaigns:steps.step1-type'),
        component: <Box>Text 1</Box>,
      },
    ],
    [
      1,
      {
        label: t('campaigns:steps.step2-type'),
        component: <Box>Text 2</Box>,
      },
    ],
    [
      2,
      {
        label: t('campaigns:steps.step3-type'),
        component: <Box>Text 3</Box>,
      },
    ],
    [
      3,
      {
        label: t('campaigns:steps.step4-type'),
        component: <Box>Text 4</Box>,
      },
    ],
    [
      4,
      {
        label: t('campaigns:steps.step4-type'),
        component: <Box>Text 5</Box>,
      },
    ],
  ])

  return (
    <Layout>
      <Box>
        <CustomHorizontalStepper steps={steps} />
      </Box>
    </Layout>
  )
}
