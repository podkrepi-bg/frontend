import React from 'react'
import Link from 'next/link'
import {
  Collapse,
  CSSObject,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Theme,
  Typography,
} from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import { observer } from 'mobx-react'
import { useTranslation } from 'next-i18next'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import MuiDrawer from '@mui/material/Drawer'
import HomeIcon from '@mui/icons-material/Home'
import PublicIcon from '@mui/icons-material/Public'
import GridViewIcon from '@mui/icons-material/GridView'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import { styled } from '@mui/material/styles'

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

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(9)} + 1px)`,
    },
  })

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
    ({ theme, open }: { theme: Theme; open: boolean }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  )

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      sx={{
        '& .MuiDrawer-paper': {
          top: 64,
          borderRight: 'none',
        },
      }}>
      <List>
        <ListItem>
          <Link href={routes.dashboard.index} passHref>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography className={classes.listItemText}>
                    {t('appbar.drawer.home')}
                  </Typography>
                }
              />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={toggleDrawerEntityOpen}>
            <ListItemIcon>
              <FormatListBulletedIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.listItemText}>
                  {t('appbar.drawer.entities.heading')}
                </Typography>
              }
            />
            {drawerEntityOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={drawerEntityOpen} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemButton onClick={toggleDrawerCountryOpen}>
                <ListItemIcon>
                  <PublicIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography className={classes.listItemText}>
                      {t('appbar.drawer.entities.country.heading')}
                    </Typography>
                  }
                />
                {drawerCountryOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={drawerCountryOpen} timeout="auto" unmountOnExit>
              <List>
                <ListItem>
                  <Link href={routes.dashboard.country.index} passHref>
                    <ListItemButton>
                      <ListItemIcon>
                        <GridViewIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography className={classes.listItemText}>
                            {t('appbar.drawer.entities.country.all')}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href={routes.dashboard.country.create} passHref>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography className={classes.listItemText}>
                            {t('appbar.drawer.entities.country.create')}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>
      </List>
    </Drawer>
  )
})
