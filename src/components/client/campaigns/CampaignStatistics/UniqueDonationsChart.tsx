import React from 'react'

import { useTranslation } from 'next-i18next'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { moneyPublic } from 'common/util/money'
import { useCampaignUniqueDonations } from 'common/hooks/campaigns'
import { Box, Stack, Typography } from '@mui/material'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  ChartTooltip,
  Filler,
  Legend,
  ChartDataLabels,
)

type Props = {
  campaignId: string
}

export default function UniqueDonationsChart({ campaignId }: Props) {
  const { t } = useTranslation()
  const { data: statistics } = useCampaignUniqueDonations(campaignId)
  if (!statistics?.length) return <div />

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
      },
      datalabels: {
        display: true,
        color: 'black',
      },
    },
  }
  const data = {
    labels: statistics.map((donation) => moneyPublic(donation.amount)),
    datasets: [
      {
        fill: true,
        label: t('campaigns:statistics.count'),
        data: statistics.map((donation) => donation.count),
        borderWidth: 2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box>
      <Stack sx={{ marginBottom: '10px' }}>
        <Typography variant="h6">{t('campaigns:statistics.uniqueTitle')}</Typography>
        <Typography variant="caption">{t('campaigns:statistics.uniqueDesc')}</Typography>
      </Stack>
      <Bar options={options} data={data} />
    </Box>
  )
}
