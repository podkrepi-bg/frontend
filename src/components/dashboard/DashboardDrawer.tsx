import React from 'react'
import Link from 'next/link'
import { Collapse, Drawer, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'

export const drawerWidth = '194px'

const useStyles = makeStyles((theme) =>
  createStyles({
    listItemText: {
      fontFamily: 'Lato',
      fontSize: '16px',
    },
  }),
)

export default observer(function DashboardDrawer() {
  const {
    drawerOpen,
    drawerEntityOpen,
    drawerCountryOpen,
    toggleDrawerEntityOpen,
    toggleDrawerCountryOpen,
  } = DashboardStore

  const { t } = useTranslation('dashboard')
  const classes = useStyles()

  return (
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
  )
})
