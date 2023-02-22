import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import { SocialIcons } from './SocialIcons'

export const LogoSocialIcons = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <Grid item xs={12} sm={8} md={5} container direction="column">
      <Grid item>
        <Link href={routes.index} passHref aria-label={t('meta.title')}>
          <PodkrepiLogo locale={locale} size="large" variant="fixed" />
        </Link>
      </Grid>
      <SocialIcons />
    </Grid>
  )
}
