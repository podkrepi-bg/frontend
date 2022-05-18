import React from 'react'
import { useSession } from 'next-auth/react'
import { Button, Grid } from '@mui/material'
import { useTranslation } from 'next-i18next'

import { staticUrls } from 'common/routes'
import { isAdmin } from 'common/util/roles'

import DonationMenu from './DonationMenu'
import ProjectMenu from './ProjectMenu'
import AdminMenu from './AdminMenu'
import DevelopmentMenu from './DevelopmentMenu'

export default function MainNavMenu({ children }: { children?: React.ReactNode }) {
  const { t } = useTranslation()
  const { data: session, status } = useSession()

  return (
    <Grid container direction="row" wrap="nowrap" alignItems="baseline" spacing={1}>
      <Grid item>
        <DonationMenu />
      </Grid>
      <Grid item>
        <ProjectMenu />
      </Grid>
      <Grid item>
        <DevelopmentMenu />
      </Grid>
      {status === 'authenticated' && isAdmin(undefined, session) && (
        <Grid item>
          <AdminMenu />
        </Grid>
      )}
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
