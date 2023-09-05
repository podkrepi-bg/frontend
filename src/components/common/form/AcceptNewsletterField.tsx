import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'
import CheckboxField from 'components/common/form/CheckboxField'

export type AcceptNewsLetterFieldProps = {
  name: string
}

export default function AcceptNewsLetterField({ name }: AcceptNewsLetterFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={<Typography variant="body2">{t('validation:agree-with-newsletter')}</Typography>}
    />
  )
}
