import React from 'react'
import { Grid2, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import theme from 'common/theme'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'
import LinkButton from 'components/common/LinkButton'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()

  return (
    <Grid2 container direction="row" wrap="nowrap" alignItems="baseline" spacing={4}>
      <Grid2>
        <LinkButton
          variant="outlined"
          size="large"
          color="inherit"
          sx={{ borderColor: theme.palette.primary.main }}
          href={routes.campaigns.index}>
          <Typography variant="button" color="#000000DE">
            {t('nav.donate')}
          </Typography>
        </LinkButton>
      </Grid2>
      <Grid2>
        <DonationMenu />
      </Grid2>
      <Grid2>
        <ProjectMenu />
      </Grid2>
      {/* <Grid2 item>
        <DevelopmentMenu />
      </Grid2> */}
      {children}
    </Grid2>
  );
}
