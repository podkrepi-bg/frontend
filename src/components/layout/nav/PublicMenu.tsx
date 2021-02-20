import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import LinkButton from 'components/common/LinkButton'
import { routes } from 'common/routes'

export default function PublicMenu() {
  const { t } = useTranslation()
  return (
    <Grid container justify="flex-end" direction="row" wrap="nowrap" spacing={2}>
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
