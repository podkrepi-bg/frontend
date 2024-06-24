import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import CheckboxField from 'components/common/form/CheckboxField'

export type AcceptNewsLetterFieldProps = {
  name: string
}

export function AcceptNewsLetterField({ name }: AcceptNewsLetterFieldProps) {
  const { t } = useTranslation('common')
  return (
    <CheckboxField
      name={name}
      label={
        <Typography textAlign="start" variant="body2">
          {t('notifications.agree-with-newsletter')}
        </Typography>
      }
    />
  )
}

export function AcceptNewsLetterFieldCampaign({ name }: AcceptNewsLetterFieldProps) {
  const { t } = useTranslation('common')
  return (
    <CheckboxField
      name={name}
      label={
        <Typography textAlign="start" variant="body2">
          {t('notifications.agree-with-newsletter-campaign')}
        </Typography>
      }
    />
  )
}
