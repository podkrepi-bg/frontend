import React from 'react'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Colors,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

import { useCampaignApprovedExpensesList } from 'common/hooks/expenses'
import { fromMoney, moneyPublic, toMoney } from 'common/util/money'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Colors, Tooltip, Legend)

type ExpenseDataset = {
  type: string
  total: number
}

type Props = {
  slug: string
  reachedAmount: number
  currency?: string
}

export default observer(function CampaignPublicExpensesChart({
  slug,
  reachedAmount,
  currency,
}: Props) {
  const { t } = useTranslation('')
  const { data: campaignExpenses } = useCampaignApprovedExpensesList(slug)

  const expenses: ExpenseDataset[] = []

  campaignExpenses?.forEach(({ type, amount }) => {
    const exists = expenses.find((e) => e.type === type)
    if (exists) exists.total += fromMoney(amount)
    else expenses.push({ type, total: fromMoney(amount) })
  })

  expenses.sort((a, b) => b.total - a.total)

  const options = {
    indexAxis: 'y' as const,
    scales: {
      x: {
        stacked: true,
        min: 0,
        max: fromMoney(reachedAmount),
      },
      y: {
        stacked: true,
        display: false,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      colors: {
        enabled: true,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'bar'>) =>
            ` ${context.dataset.label + ':' || ''} ${moneyPublic(
              toMoney(context.parsed.x),
              currency,
            )}`,
        },
      },
    },
  }

  const data = {
    labels: [''],
    datasets: expenses.map((expense) => {
      return {
        label: t('expenses:field-types.' + expense.type),
        data: [expense.total],
      }
    }),
  }

  return <Bar options={options} height={80} data={data} />
})
