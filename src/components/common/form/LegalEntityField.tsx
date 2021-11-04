import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import CheckboxField from 'components/common/form/CheckboxField'

export type AcceptTermsFieldProps = {
  name: string
}

export default function LegalEntityField({ name }: AcceptTermsFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={<Typography variant="body2">{t('validation:legal-entity')}</Typography>}
    />
  )
}
