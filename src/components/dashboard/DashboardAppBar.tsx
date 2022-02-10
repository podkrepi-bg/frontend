import React from 'react'
import Link from 'next/link'
import {
  AppBar,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

import DashboardProfileMenu from './DashboardProfileMenu'

const drawerWidth = 200

export default observer(function DashboardAppBar() {
  const {
    drawerOpen,
    drawerEntityOpen,
    drawerCountryOpen,
    toggleDrawerOpen,
    toggleDrawerEntityOpen,
    toggleDrawerCountryOpen,
  } = DashboardStore

  const { t } = useTranslation('dashboard')

  return (
    <>
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
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            top: 64,
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
          },
        }}>
        <List>
          <ListItemButton onClick={toggleDrawerEntityOpen}>
            <ListItemText primary={t('appbar.drawer.entities.heading')} />
            {drawerEntityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={drawerEntityOpen} timeout="auto" unmountOnExit>
            <List>
              <ListItemButton onClick={toggleDrawerCountryOpen}>
                <ListItemText primary={t('appbar.drawer.entities.country.heading')} />
                {drawerCountryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={drawerCountryOpen} timeout="auto" unmountOnExit>
                <List>
                  <Link href={routes.dashboard.country.create} passHref>
                    <ListItemButton>
                      <ListItemText primary={t('appbar.drawer.entities.country.create')} />
                    </ListItemButton>
                  </Link>
                </List>
              </Collapse>
            </List>
          </Collapse>
        </List>
      </Drawer>
    </>
  )
})
