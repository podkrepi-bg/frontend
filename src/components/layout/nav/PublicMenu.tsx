import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

export default function PublicMenu() {
  const { t } = useTranslation()
  return (
    <>
      <Grid item>
        <LinkButton variant="text" href={routes.login}>
          {t('nav.login')}
        </LinkButton>
      </Grid>
      <Grid item>
        <LinkButton variant="outlined" href={routes.register}>
          {t('nav.register')}
        </LinkButton>
      </Grid>
    </>
  )
}
