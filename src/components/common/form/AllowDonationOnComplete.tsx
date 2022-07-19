import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export type AllowDonationOnCompleteProps = {
  name: string
}

export default function AllowDonationOnComplete({ name }: AllowDonationOnCompleteProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={
        <Typography variant="body2">{t('campaigns:cta:allow-donation-on-complete')}</Typography>
      }
    />
  )
}
