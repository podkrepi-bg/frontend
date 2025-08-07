import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Grid2 } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/common/brand/PodkrepiLogo'
import { SocialIcons } from './SocialIcons'

export const LogoSocialIcons = () => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  return (
    <Grid2
      container
      direction="column"
      gap={1}
      size={{
        xs: 12,
        sm: 8,
        md: 5,
      }}>
      <Grid2 container style={{ maxWidth: 236, maxHeight: 48 }} justifyContent={'flex-start'}>
        <Link href={routes.index} passHref aria-label={t('meta.title')}>
          <PodkrepiLogo locale={locale} size="large" variant="adaptive" />
        </Link>
      </Grid2>
      <SocialIcons />
    </Grid2>
  )
}
