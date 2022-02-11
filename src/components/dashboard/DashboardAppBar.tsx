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
  Typography,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

import DashboardProfileMenu from './DashboardProfileMenu'

const drawerWidth = '194px'

const useStyles = makeStyles((theme) =>
  createStyles({
    listItemText: {
      fontFamily: 'Lato',
      fontSize: '16px',
    },
  }),
)

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
  const classes = useStyles()

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
            <ListItemText
              primary={
                <Typography className={classes.listItemText}>
                  {t('appbar.drawer.entities.heading')}
                </Typography>
              }
            />
            {drawerEntityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={drawerEntityOpen} timeout="auto" unmountOnExit>
            <List>
              <ListItemButton onClick={toggleDrawerCountryOpen}>
                <ListItemText
                  primary={
                    <Typography className={classes.listItemText}>
                      {t('appbar.drawer.entities.country.heading')}
                    </Typography>
                  }
                />
                {drawerCountryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={drawerCountryOpen} timeout="auto" unmountOnExit>
                <List>
                  <Link href={routes.dashboard.country.index} passHref>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Typography className={classes.listItemText}>
                            {t('appbar.drawer.entities.country.all')}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Link>
                  <Link href={routes.dashboard.country.create} passHref>
                    <ListItemButton>
                      <ListItemText
                        primary={
                          <Typography className={classes.listItemText}>
                            {t('appbar.drawer.entities.country.create')}
                          </Typography>
                        }
                      />
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
