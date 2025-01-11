import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import { SocialIcons } from './SocialIcons'

export const LogoSocialIcons = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <Grid item xs={12} sm={8} md={5} container direction="column" gap={1}>
      <Grid container sx={{ maxWidth: 236, maxHeight: 48 }} item justifyContent={'flex-start'}>
        <Link href={routes.index} passHref aria-label={t('meta.title')}>
          <PodkrepiLogo locale={locale} size="large" variant="adaptive" />
        </Link>
      </Grid>
      <SocialIcons />
    </Grid>
  )
}
