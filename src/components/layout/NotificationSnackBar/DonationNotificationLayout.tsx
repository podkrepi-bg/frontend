import { useTranslation } from 'next-i18next'
import { Avatar, Box, Typography } from '@mui/material'
import { dateToTime } from 'components/faq/helpers/utils'
import { grey } from '@mui/material/colors'
import { money } from 'common/util/money'

export type NotificationLayoutData = {
  createdAt: string
  person: {
    firstName: string
    lastName: string
    picture: string
  }
  currency: string
  amount: number
}

export default function DonationNotificationLayout({
  data,
}: {
  data: NotificationLayoutData | undefined
}) {
  const { person, createdAt, currency, amount } = data || {}

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', maxHeight: '50px' }}>
      <Avatar sx={{ marginRight: '1rem' }} src={person?.picture} alt="Avatar" />
      <Box>
        <Typography component="h1" sx={{ fontWeight: 'bold' }}>
          {person ? `${person?.firstName} ${person?.lastName}` : 'unknown'}
        </Typography>
        <Typography color={grey[600]}>{`${money(amount as number)} ${currency}  |  ${dateToTime(
          createdAt,
        )}`}</Typography>
      </Box>
    </Box>
  )
}
