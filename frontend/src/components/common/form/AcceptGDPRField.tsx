import { useTranslation } from 'next-i18next'
import { Typography } from '@material-ui/core'

import { routes } from 'common/routes'
import ExternalLink from 'components/common/ExternalLink'
import CheckboxField from 'components/common/form/CheckboxField'

export type AcceptGDPRFieldProps = {
  name: string
}

export default function AcceptGDPRField({ name }: AcceptGDPRFieldProps) {
  const { t } = useTranslation()
  return (
    <CheckboxField
      name={name}
      label={
        <Typography variant="body2">
          {t('validation:agree-with')}{' '}
          <ExternalLink href={routes.termsOfService}>{t('validation:gdpr')}</ExternalLink>
        </Typography>
      }
    />
  )
}
