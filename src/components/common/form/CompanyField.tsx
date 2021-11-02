import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export type AcceptTermsFieldProps = {
  name: string
}

export default function CompanyField({ name }: AcceptTermsFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={<Typography variant="body2">{t('validation:is-company')}</Typography>}
    />
  )
}
