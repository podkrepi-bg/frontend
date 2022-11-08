import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { SocialIcons } from './SocialIcons'

import { InfoGridWrapper } from './Footer.styled'

export const InfoGrid = () => {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <InfoGridWrapper container direction="column" spacing={2}>
      <Grid item>
        <Link href={routes.index}>
          <a>
            <PodkrepiLogo locale={locale} size="large" variant="fixed" />
          </a>
        </Link>
      </Grid>
      <Grid item>
        <SocialIcons />
      </Grid>
      <Grid item>{t('components.footer.copyrights')}</Grid>
    </InfoGridWrapper>
  )
}
