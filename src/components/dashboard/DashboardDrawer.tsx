import React from 'react'
import Link from 'next/link'
import {
  Collapse,
  CSSObject,
  List,
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
import { styled } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import MuiDrawer from '@mui/material/Drawer'
import HomeIcon from '@mui/icons-material/Home'
import PublicIcon from '@mui/icons-material/Public'
import GridViewIcon from '@mui/icons-material/GridView'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

import { routes } from 'common/routes'
import { DashboardStore } from 'stores/DashboardStore'
import { useRouter } from 'next/router'

export const drawerWidth = '194px'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemButton: {
      padding: '6px 10px 6px 15px',
      borderRadius: '20px',
      '&:active': {
        backgroundColor: theme.palette.primary.main,
      },
      margin: '0 10px',
    },
    listItemButtonActive: {
      padding: '6px 10px 6px 15px',
      borderRadius: '20px',
      backgroundColor: '#4AC3FF42',
      '&:hover': {
        backgroundColor: '#4AC3FF42',
      },
      margin: '0 10px',
    },
    ListItemIcon: {
      minWidth: '31px',
      marginLeft: '-10px',
      transition: theme.transitions.create('min-width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    listItemText: {
      fontFamily: 'Lato',
      fontSize: '16px',
    },
  }),
)

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const compactMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`,
  },
  paddingLeft: '0',
  paddingRight: '0',
  '.MuiListItemIcon-root': {
    minWidth: '45px',
  },
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: 0,
  zIndex: -1,
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open, compact }: { theme: Theme; open: boolean; compact: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(open &&
      compact && {
        ...compactMixin(theme),
        '& .MuiDrawer-paper': compactMixin(theme),
      }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export default observer(function DashboardDrawer() {
  const {
    drawerOpen,
    drawerCompact,
    drawerEntityOpen,
    drawerCountryOpen,
    toggleDrawerCompact,
    toggleDrawerEntityOpen,
    toggleDrawerCountryOpen,
  } = DashboardStore

  const { t } = useTranslation('dashboard')
  const classes = useStyles()
  const { asPath } = useRouter()
  const pageUrl = asPath.split('#')[0]

  return (
    <Drawer
      variant="permanent"
      open={drawerOpen}
      compact={drawerCompact}
      sx={{
        '& .MuiDrawer-paper': {
          top: 64,
          borderRight: 'none',
        },
      }}>
      <List
        sx={{
          padding: '31px 0 320px 0',
          height: '100%',
          position: 'relative',
        }}>
        <Link href={routes.dashboard.index} passHref>
          <ListItemButton
            className={
              pageUrl == routes.dashboard.index
                ? classes.listItemButtonActive
                : classes.listItemButton
            }>
            <ListItemIcon className={classes.ListItemIcon}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography className={classes.listItemText}>{t('appbar.drawer.home')}</Typography>
              }
            />
          </ListItemButton>
        </Link>
        <ListItemButton className={classes.listItemButton} onClick={toggleDrawerEntityOpen}>
          <ListItemIcon className={classes.ListItemIcon}>
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
        <Collapse in={drawerEntityOpen} timeout="auto" unmountOnExit>
          <List>
            <ListItemButton className={classes.listItemButton} onClick={toggleDrawerCountryOpen}>
              <ListItemIcon className={classes.ListItemIcon}>
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
            <Collapse in={drawerCountryOpen} timeout="auto" unmountOnExit>
              <List>
                <Link href={routes.dashboard.country.index} passHref>
                  <ListItemButton
                    className={
                      pageUrl == routes.dashboard.country.index
                        ? classes.listItemButtonActive
                        : classes.listItemButton
                    }>
                    <ListItemIcon className={classes.ListItemIcon}>
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
                <Link href={routes.dashboard.country.create} passHref>
                  <ListItemButton
                    className={
                      pageUrl == routes.dashboard.country.create
                        ? classes.listItemButtonActive
                        : classes.listItemButton
                    }>
                    <ListItemIcon className={classes.ListItemIcon}>
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
              </List>
            </Collapse>
          </List>
        </Collapse>
        <ListItemButton
          sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            bottom: '125px',
          }}
          className={classes.listItemButton}
          onClick={toggleDrawerCompact}>
          <ListItemIcon className={classes.ListItemIcon}>
            {drawerCompact ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.listItemText}>{t('appbar.drawer.compact')}</Typography>
            }
          />
        </ListItemButton>
        <ListItemButton
          sx={{
            position: 'absolute',
            width: 'calc(100% - 20px)',
            bottom: '80px',
          }}
          className={classes.listItemButton}>
          <ListItemIcon className={classes.ListItemIcon}>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography className={classes.listItemText}>
                {t('appbar.drawer.settings')}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </Drawer>
  )
})
