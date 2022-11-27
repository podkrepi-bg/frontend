import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

import { formatDateString } from 'common/util/date'

type Props = {
  createdAt?: string | Date
  showLabel?: boolean
}
export default function DateCreated({ createdAt, showLabel = false }: Props) {
  const { t, i18n } = useTranslation()
  if (!createdAt) return null
  return (
    <Typography variant="subtitle2" color={grey[600]}>
      {showLabel && t('blog:created-on')} {formatDateString(createdAt, i18n.language)}
    </Typography>
  )
}
