import { Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useTranslation } from 'react-i18next'

type Props = {
  readingTime?: number
  showLabel?: boolean
}
export default function ReadingTime({ readingTime, showLabel = false }: Props) {
  const { t } = useTranslation()
  if (!readingTime) return null
  return (
    <Typography variant="subtitle2" color={grey[600]}>
      {showLabel && t('blog:reading-time.label')}{' '}
      {t('blog:reading-time.count', { count: readingTime })}
    </Typography>
  )
}
