import React from 'react'
import { Button, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { staticUrls } from 'common/routes'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'
import CountryMenu from './CountryMenu'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="baseline" spacing={1}>
      <Grid item>
        <ProjectMenu />
      </Grid>
      <Grid item>
        <DonationMenu />
      </Grid>
      <Grid item>
        <CountryMenu />
      </Grid>
      <Grid item>
        <Button
          variant="text"
          target="_blank"
          color="primary"
          href={staticUrls.blog}
          style={{ whiteSpace: 'nowrap' }}>
          {t('nav.blog')}
        </Button>
      </Grid>
      {children}
    </Grid>
  )
}
