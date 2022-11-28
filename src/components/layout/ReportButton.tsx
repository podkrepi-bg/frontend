import { useTranslation } from 'react-i18next'
import { IconButton } from '@mui/material'
import { ErrorOutline } from '@mui/icons-material'

export default function ReportButton() {
  const { t } = useTranslation()
  return (
    <IconButton aria-label={t('common:report')} size="small">
      <ErrorOutline />
    </IconButton>
  )
}
