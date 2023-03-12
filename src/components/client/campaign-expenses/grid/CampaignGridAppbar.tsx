import { useRouter } from 'next/router'
import { Box, Toolbar, Tooltip, Typography } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { routes } from 'common/routes'
import { useViewCampaign } from 'common/hooks/campaigns'
import { useCampaignExpensesList } from 'common/hooks/expenses'
import { useTranslation } from 'next-i18next'
import { moneyPublic } from 'common/util/money'

const addIconStyles = {
  background: '#4ac3ff',
  borderRadius: '50%',
  cursor: 'pointer',
  padding: 1.2,
  boxShadow: 3,
}
type Props = { slug: string }

export default function GridAppbar({ slug }: Props) {
  const router = useRouter()
  const { data: campaignResponse } = useViewCampaign(slug)
  const { data: expensesList } = useCampaignExpensesList(slug)
  const { t } = useTranslation('')

  const totalExpenses = expensesList?.reduce((acc, expense) => acc + expense.amount, 0)

  return (
    <Toolbar
      sx={{
        background: 'white',
        borderTop: '1px solid lightgrey',
        display: 'flex',
        justifyContent: 'space-between',
        height: '72px',
      }}>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>
          {t('expenses:reported')}:{' '}
          {moneyPublic(totalExpenses || 0, campaignResponse?.campaign.currency)}
        </Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>
          {t('campaigns:campaign.amount')}:{' '}
          {moneyPublic(
            campaignResponse?.campaign.targetAmount || 0,
            campaignResponse?.campaign.currency,
          )}
        </Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'start', pt: 1 }}>
        <Typography>
          {t('campaigns:donationsAmount')}:{' '}
          {moneyPublic(
            campaignResponse?.campaign.summary.reachedAmount || 0,
            campaignResponse?.campaign.currency,
          )}
        </Typography>
      </Box>
      <Box sx={{ height: '64px', display: 'flex', alignItems: 'flex-end', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title={t('expenses:btns.add')}>
            <AddIcon
              sx={addIconStyles}
              fontSize="large"
              onClick={() =>
                router.push(routes.campaigns.expenses.create(router.query?.slug as string))
              }
            />
          </Tooltip>
        </Box>
      </Box>
    </Toolbar>
  )
}
