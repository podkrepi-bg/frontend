import React from 'react'
import Link from 'next/link'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

import DashboardProfileMenu from './DashboardProfileMenu'
import DashboardSearchField from './DashboardSearchField'
import DashboardNotifications from './country/DashboardNotifications'

export default observer(function DashboardAppBar() {
  const { toggleDrawerOpen } = DashboardStore

  return (
    <AppBar
      sx={{
        backgroundColor: '#fff',
        boxShadow: 'none',
        paddingLeft: '12px',
      }}>
      <Toolbar disableGutters>
        <Link href={routes.index}>
          <a>
            <PodkrepiIcon
              sx={{
                height: 40,
                width: 'auto',
              }}
            />
          </a>
        </Link>
        <IconButton
          onClick={toggleDrawerOpen}
          sx={{
            marginLeft: '90px',
            marginRight: '20px',
          }}
          color="primary">
          <MenuIcon />
        </IconButton>
        <DashboardSearchField />
        <DashboardNotifications />
        <DashboardProfileMenu />
      </Toolbar>
    </AppBar>
  )
})
