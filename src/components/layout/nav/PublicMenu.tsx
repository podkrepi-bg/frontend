import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'
import LocaleMenu from 'components/layout/LocaleMenu'

export default function PublicMenu() {
  const { t } = useTranslation()
  return (
    <Grid container justify="flex-end" direction="row" wrap="nowrap" spacing={2}>
      <Grid item>
        <LocaleMenu />
      </Grid>
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
    </Grid>
  )
}
