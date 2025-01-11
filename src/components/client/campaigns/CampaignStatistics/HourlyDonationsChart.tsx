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

import { useCampaignHourlyDonations } from 'common/hooks/campaigns'
import { Box, Stack, Typography } from '@mui/material'
import { CampaignHourlyDonations } from 'gql/campaigns'

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

ChartTooltip.positioners.cursor = function (chartElements, coordinates) {
  return coordinates
}

type Props = {
  campaignId: string
}

export default function HourlyDonationsChart({ campaignId }: Props) {
  const { t } = useTranslation()
  const { data: statistics } = useCampaignHourlyDonations(campaignId)
  if (!statistics?.length) return <div />

  const finalData: CampaignHourlyDonations[] = []

  let lastHour = 0

  statistics.forEach((period) => {
    while (lastHour < period.hour) {
      finalData.push({ hour: lastHour, count: 0 })
      lastHour += 1
    }
    finalData.push(period)
    lastHour += 1
  })

  while (lastHour < 24) {
    finalData.push({ hour: lastHour, count: 0 })
    lastHour += 1
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        position: 'cursor',
      },
      datalabels: {
        formatter: function (value: number) {
          return value ? value : ''
        },
        display: true,
        color: 'black',
      },
    },
  }
  const data = {
    labels: finalData.map((donation) =>
      new Date(1000 * 60 * 60 * donation.hour).toISOString().slice(11, 16),
    ),
    datasets: [
      {
        fill: true,
        label: t('campaigns:statistics.count'),
        data: finalData.map((donation) => donation.count),
        borderWidth: 2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box>
      <Stack sx={{ marginBottom: '10px' }}>
        <Typography variant="h6">{t('campaigns:statistics.hourlyTitle')}</Typography>
        <Typography variant="caption">{t('campaigns:statistics.hourlyDesc')}</Typography>
      </Stack>
      <Bar options={options} data={data} />
    </Box>
  )
}
