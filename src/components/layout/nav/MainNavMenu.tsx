import React from 'react'
import { Button, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="baseline" spacing={4}>
      <Grid item>
        <Button
          variant="outlined"
          color="inherit"
          href={routes.campaigns.index}
          style={{ borderColor: '#32A9FE' }}>
          {t('nav.donatе')}
        </Button>
      </Grid>
      <Grid item>
        <DonationMenu />
      </Grid>
      <Grid item>
        <ProjectMenu />
      </Grid>
      {/* <Grid item>
        <DevelopmentMenu />
      </Grid> */}
      {children}
    </Grid>
  )
}
