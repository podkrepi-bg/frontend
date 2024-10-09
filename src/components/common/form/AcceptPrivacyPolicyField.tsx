import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { routes } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import CheckboxField, { CheckboxFieldProps } from 'components/common/form/CheckboxField'

export type AcceptGDPRFieldProps = {
  name: string
  showFieldError?: boolean
  disabled?: boolean
}

export default function AcceptPrivacyPolicyField({
  name,
  showFieldError = true,
  disabled,
  ...rest
}: AcceptGDPRFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      disabled={disabled}
      showFieldError={showFieldError}
      label={
        <Typography variant="body2">
          {t('validation:informed-agree-with')}{' '}
          <ExternalLink href={routes.privacyPolicy}>{t('validation:gdpr')}</ExternalLink>
        </Typography>
      }
      {...rest}
    />
  )
}
