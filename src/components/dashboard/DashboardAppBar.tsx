import React from 'react'
import Link from 'next/link'
import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

import DashboardProfileMenu from './DashboardProfileMenu'

export default observer(function DashboardAppBar() {
  const { toggleDrawerOpen } = DashboardStore

  return (
    <AppBar
      sx={{
        backgroundColor: '#fff',
        boxShadow: 'none',
      }}>
      <Toolbar disableGutters>
        <Link href={routes.index}>
          <a>
            <PodkrepiIcon
              sx={{
                height: 40,
                width: 'auto',
                marginRight: 12,
              }}
            />
          </a>
        </Link>
        <IconButton onClick={toggleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <DashboardProfileMenu />
      </Toolbar>
    </AppBar>
  )
})
