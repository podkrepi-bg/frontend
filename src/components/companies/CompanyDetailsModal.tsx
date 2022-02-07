import { Dialog, Card, CardContent, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

type Props = {
  isOpen: boolean
  close: () => void
  companyName: string
  companyNumber: string
  representative: string
  countryCore: string
}

export default function CompanyDetailsModal({
  isOpen,
  close,
  companyName,
  companyNumber,
  representative,
  countryCore,
}: Props) {
  const { t } = useTranslation()
  return (
    <Dialog open={isOpen} onClose={close} sx={{ top: '-35%' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ marginBottom: '16px' }}>
            {t('companies:cta.details')}:
          </Typography>
          <Typography variant="body2">
            {t('companies:title')}: {companyName}
          </Typography>
          <Typography variant="body2">
            {t('companies:number')}: {companyNumber}
          </Typography>
          <Typography variant="body2">
            {t('companies:representative')}: {representative}
          </Typography>
          <Typography variant="body2">
            {t('companies:countryCode')}: {countryCore}
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  )
}
