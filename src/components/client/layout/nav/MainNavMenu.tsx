import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'
import LinkButton from 'components/common/LinkButton'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="baseline" spacing={4}>
      <Grid item>
        <LinkButton
          variant="outlined"
          size="large"
          color="inherit"
          sx={{ borderColor: '#32A9FE' }}
          href={routes.campaigns.index}>
          <Typography variant="button" color="#000000DE">
            {t('nav.donate')}
          </Typography>
        </LinkButton>
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
