import Link from 'next/link'
import { useRouter } from 'next/router'

import { Grid } from '@mui/material'

import { routes } from 'common/routes'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { SocialIcons } from './SocialIcons'

export const LogoSocialIcons = () => {
  const { locale } = useRouter()

  return (
    <Grid item xs={12} sm={8} md={5} container direction="column">
      <Grid item>
        <Link href={routes.index}>
          <PodkrepiLogo locale={locale} size="large" variant="fixed" />
        </Link>
      </Grid>
      <SocialIcons />
    </Grid>
  )
}
