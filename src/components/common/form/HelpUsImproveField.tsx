import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export type HelpUsImproveFieldProps = {
  name: string
}

export default function HelpUsImproveField({ name }: HelpUsImproveFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={
        <Typography variant="body2">
          {t('validation:help-us-improve')}{' '}
        </Typography>
      }
    />
  )
}