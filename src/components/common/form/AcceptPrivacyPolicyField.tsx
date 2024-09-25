import { useTranslation } from 'next-i18next'
import { Typography } from '@mui/material'

import { routes } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import CheckboxField, { CheckboxFieldProps } from 'components/common/form/CheckboxField'

export type AcceptGDPRFieldProps = Omit<CheckboxFieldProps, 'label'>

export default function AcceptPrivacyPolicyField({ name, ...rest }: AcceptGDPRFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
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
