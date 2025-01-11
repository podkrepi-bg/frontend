import React, { useState } from 'react'

import { useTranslation } from 'next-i18next'
import { addHours, addMonths, addWeeks } from 'date-fns'

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
  TooltipItem,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import ChartDataLabels, { Context } from 'chartjs-plugin-datalabels'

import { fromMoney, moneyPublic } from 'common/util/money'
import { CampaignGroupedDonations } from 'gql/campaigns'
import { useCampaignGroupedDonations } from 'common/hooks/campaigns'
import { StatisticsGroupBy } from '../helpers/campaign.enums'
import { Box, Button, Stack, Typography } from '@mui/material'

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
  startDate?: Date
  endDate?: Date
}

export default function GroupedDonationsChart({ campaignId, startDate, endDate }: Props) {
  const { t } = useTranslation()
  const [timePeriod, setTimePeriod] = useState<StatisticsGroupBy>(StatisticsGroupBy.WEEK)

  const { data: statistics } = useCampaignGroupedDonations(campaignId, timePeriod)
  if (!statistics?.length) return <div />

  const finalData: CampaignGroupedDonations[] = []

  let previousDate = startDate ? new Date(startDate) : new Date(statistics[0].date)

  const end = endDate ? new Date(endDate) : new Date()

  const addPeriod = (date: Date, period: StatisticsGroupBy) => {
    switch (period) {
      case StatisticsGroupBy.DAY:
        return addHours(date, 24)
      case StatisticsGroupBy.WEEK:
        return addWeeks(date, 1)
      case StatisticsGroupBy.MONTH:
        return addMonths(date, 1)
    }
  }

  statistics.forEach((donation) => {
    while (previousDate < new Date(donation.date)) {
      finalData.push({ date: previousDate.toISOString(), count: 0, sum: 0 })
      previousDate = addHours(previousDate, 24)
    }
    finalData.push(donation)
    previousDate = addPeriod(previousDate, timePeriod)
  })

  while (previousDate < end) {
    finalData.push({ date: previousDate.toISOString(), count: 0, sum: 0 })
    previousDate = addPeriod(previousDate, timePeriod)
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          title: (context: TooltipItem<'bar'>[]) => {
            const label = context[0].label
            if (timePeriod === StatisticsGroupBy.WEEK)
              return `${label} / ${addPeriod(new Date(label), timePeriod)
                .toISOString()
                .slice(0, 10)}`
            return label
          },
          label: (context: TooltipItem<'bar'>) => {
            const item = finalData[context.dataIndex]
            return [
              `${t('campaigns:statistics.count')}: ${item.count}`,
              `${t('campaigns:statistics.total')}: ${moneyPublic(item.sum)}`,
            ]
          },
        },
      },
      datalabels: {
        formatter: function (value: number, context: Context) {
          const item = finalData[context.dataIndex]
          return item.count ? item.count : ''
        },
        display: true,
        color: 'black',
        anchor: 'end',
        offset: -20,
        align: 'start',
      },
    },
  }
  const data = {
    labels: finalData.map((donation) =>
      timePeriod === StatisticsGroupBy.MONTH
        ? donation.date.slice(0, 7)
        : donation.date.slice(0, 10),
    ),
    datasets: [
      {
        fill: true,
        data: finalData.map((donation) => fromMoney(donation.sum)),
        borderWidth: 2,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <Box>
      <Stack sx={{ marginBottom: '10px' }}>
        <Typography variant="h6">{t('campaigns:statistics.groupedTitle')}</Typography>
        <Typography variant="caption">{t('campaigns:statistics.groupedDesc')}</Typography>
      </Stack>
      <Bar options={options} data={data} />
      <Stack sx={{ marginTop: '10px' }}>
        <Typography>{t('campaigns:statistics.groupBy')}:</Typography>
        <Stack direction="row" sx={{ marginTop: '10px', gap: 10 }}>
          <Button
            variant={timePeriod === StatisticsGroupBy.DAY ? 'contained' : 'outlined'}
            onClick={() => setTimePeriod(StatisticsGroupBy.DAY)}>
            {t('campaigns:statistics.day')}
          </Button>
          <Button
            variant={timePeriod === StatisticsGroupBy.WEEK ? 'contained' : 'outlined'}
            onClick={() => setTimePeriod(StatisticsGroupBy.WEEK)}>
            {t('campaigns:statistics.week')}
          </Button>
          <Button
            variant={timePeriod === StatisticsGroupBy.MONTH ? 'contained' : 'outlined'}
            onClick={() => setTimePeriod(StatisticsGroupBy.MONTH)}>
            {t('campaigns:statistics.month')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
