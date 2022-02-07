import React from 'react'
import Link from 'next/link'
import {
  AppBar,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

import DashboardProfileMenu from './DashboardProfileMenu'

const useStyles = makeStyles({
  appBar: {
    backgroundColor: '#fff',
  },
  logo: {
    height: 40,
    width: 'auto',
    marginRight: 10,
  },
  closeNavBtn: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '8px 0',
  },
  submenu: {},
})

export default observer(function DashboardAppBar() {
  const classes = useStyles()
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
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={toggleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Link href={routes.index}>
          <a>
            <PodkrepiIcon className={classes.logo} />
          </a>
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('appbar.heading')}
        </Typography>
        <DashboardProfileMenu />
      </Toolbar>
      <Drawer variant="persistent" anchor="left" open={drawerOpen}>
        <List>
          <div className={classes.closeNavBtn}>
            <IconButton onClick={toggleDrawerOpen}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <ListItemButton onClick={toggleDrawerEntityOpen}>
            <ListItemText primary={t('appbar.drawer.entities.heading')} />
            {drawerEntityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={drawerEntityOpen} timeout="auto" unmountOnExit>
            <List className={classes.submenu}>
              <ListItemButton onClick={toggleDrawerCountryOpen}>
                <ListItemText primary={t('appbar.drawer.entities.country.heading')} />
                {drawerCountryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={drawerCountryOpen} timeout="auto" unmountOnExit>
                <List className={classes.submenu}>
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
    </AppBar>
  )
})
