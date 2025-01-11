import React from 'react'
import { useTranslation } from 'next-i18next'
import { addHours } from 'date-fns'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Filler,
  Legend,
  ChartOptions,
  TooltipItem,
  Plugin,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import { fromMoney, moneyPublic, toMoney } from 'common/util/money'
import { CampaignGroupedDonations } from 'gql/campaigns'
import { useCampaignGroupedDonations } from 'common/hooks/campaigns'
import { Box, Stack, Typography } from '@mui/material'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Filler,
  Legend,
  annotationPlugin,
  ChartDataLabels,
)

ChartTooltip.positioners.cursor = function (chartElements, coordinates) {
  return coordinates
}

const plugins: Plugin[] = [
  {
    id: 'tooltipLine',
    afterDraw: (chart) => {
      if (chart.tooltip?.opacity === 1) {
        const { ctx } = chart
        const { caretX } = chart.tooltip
        const topY = chart.scales.y.top
        const bottomY = chart.scales.y.bottom

        ctx.save()
        ctx.setLineDash([3, 3])
        ctx.beginPath()
        ctx.moveTo(caretX, topY - 5)
        ctx.lineTo(caretX, bottomY)
        ctx.lineWidth = 1
        ctx.stroke()
        ctx.restore()
      }
    },
  },
]

type Props = {
  campaignId: string
  startDate?: Date
  endDate?: Date
  targetAmount: number
}

export default function CumulativeDonationsChart({
  campaignId,
  startDate,
  endDate,
  targetAmount,
}: Props) {
  const { t } = useTranslation()
  const { data: statistics } = useCampaignGroupedDonations(campaignId)
  if (!statistics?.length) return <div />

  const finalData: CampaignGroupedDonations[] = []
  let sum = 0

  let previousDate = startDate ? new Date(startDate) : new Date(statistics[0].date)

  const end = endDate ? new Date(endDate) : new Date()

  statistics.forEach((donation) => {
    while (previousDate < new Date(donation.date)) {
      finalData.push({ date: previousDate.toISOString(), count: 0, sum })
      previousDate = addHours(previousDate, 24)
    }
    sum += donation.sum
    finalData.push({ ...donation, sum })
    previousDate = addHours(previousDate, 24)
  })

  while (previousDate < end) {
    finalData.push({ date: previousDate.toISOString(), count: 0, sum })
    previousDate = addHours(previousDate, 24)
  }

  const options: ChartOptions<'line'> = {
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        position: 'cursor',
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return ` ${context.dataset.label + ':' || ''} ${moneyPublic(toMoney(context.parsed.y))}`
          },
        },
      },
      datalabels: {
        display: false,
      },
      annotation: {
        annotations: [
          {
            type: 'line',
            yMin: fromMoney(targetAmount),
            yMax: fromMoney(targetAmount),
            borderColor: 'rgb(85, 195, 132)',
            borderWidth: 2,
          },
        ],
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  }

  const data = {
    labels: finalData.map((donation) => donation.date.slice(0, 10)),
    datasets: [
      {
        fill: true,
        label: t('campaigns:statistics.total'),
        data: finalData.map((donation) => fromMoney(donation.sum)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box>
      <Stack sx={{ marginBottom: '10px' }}>
        <Typography variant="h6">{t('campaigns:statistics.cumulativeTitle')}</Typography>
        <Typography variant="caption">{t('campaigns:statistics.cumulativeDesc')}</Typography>
      </Stack>
      <Line options={options} data={data} plugins={plugins} />
    </Box>
  )
}
