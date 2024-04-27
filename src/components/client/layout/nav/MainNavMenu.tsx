import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import theme from 'common/theme'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'
import LinkButton from 'components/common/LinkButton'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <>
      <Grid item component={'li'}>
        <LinkButton
          variant="outlined"
          size="large"
          color="inherit"
          tabIndex={0}
          sx={{ borderColor: theme.palette.primary.main }}
          href={routes.campaigns.index}>
          <Typography variant="button" color="#000000DE">
            {t('nav.donate')}
          </Typography>
        </LinkButton>
      </Grid>
      <Grid item component={'li'}>
        <DonationMenu />
      </Grid>
      <Grid item component={'li'}>
        <ProjectMenu />
      </Grid>
      {/* <Grid item>
        <DevelopmentMenu />
      </Grid> */}
      {children}
    </>
  )
}
