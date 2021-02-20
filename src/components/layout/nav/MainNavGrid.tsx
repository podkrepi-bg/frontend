import React from 'react'
import { Grid } from '@material-ui/core'
import { useTranslation } from 'react-i18next'

import { routes } from 'common/routes'
import LinkButton from 'components/common/LinkButton'

export default function MainNavGrid() {
  const { t } = useTranslation()
  return (
    <Grid container direction="row" wrap="nowrap" spacing={2}>
      <Grid item>
        <LinkButton
          href={routes.index}
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="text">
          {t('nav.home')}
        </LinkButton>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.about}
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="text">
          {t('nav.about')}
        </LinkButton>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.about}
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="text">
          {t('nav.about-project')}
        </LinkButton>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.about}
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="text">
          {t('nav.contacts')}
        </LinkButton>
      </Grid>
      <Grid item>
        <LinkButton
          href={routes.register}
          color="primary"
          style={{ whiteSpace: 'nowrap' }}
          variant="outlined">
          {t('nav.support-us')}
        </LinkButton>
      </Grid>
    </Grid>
  )
}
