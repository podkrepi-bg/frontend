import React from 'react'
import {
  AppBar,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AppsIcon from '@mui/icons-material/Apps'
import PeopleIcon from '@mui/icons-material/People'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { makeStyles } from '@mui/styles'
import { routes } from 'common/routes'
import ProfileMenu from './ProfileMenu'
import { useTranslation } from 'next-i18next'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import Link from 'next/link'
import { BootcampStore } from 'stores/BootcampStore'
import { observer } from 'mobx-react'

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

export default observer(function BootcampNavBar() {
  const classes = useStyles()
  const { navDrawerOpen, navDrawerSubOpen, toggleNavDrawerOpen, toggleNavDrawerSubOpen } =
    BootcampStore

  const { t } = useTranslation()

  const navLinks = [
    { icon: <PeopleIcon />, name: t('bootcamp:nav.all'), href: routes.bootcamp.index },
    { icon: <PersonAddIcon />, name: t('bootcamp:nav.add'), href: routes.bootcamp.add },
    { icon: <AppsIcon />, name: t('bootcamp:nav.other'), href: '#' },
  ]

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={toggleNavDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Link href={routes.index}>
          <a>
            <PodkrepiIcon className={classes.logo} />
          </a>
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('bootcamp:nav.title')}
        </Typography>
        <ProfileMenu />
      </Toolbar>
      <Drawer variant="persistent" anchor="left" open={navDrawerOpen}>
        <List>
          <div className={classes.closeNavBtn}>
            <IconButton onClick={toggleNavDrawerOpen}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} passHref>
              <ListItemButton key={item.name} color="black">
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          ))}
          <ListItemButton onClick={toggleNavDrawerSubOpen}>
            <ListItemText primary={t('bootcamp:nav.more')} />
            {navDrawerSubOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={navDrawerSubOpen} timeout="auto" unmountOnExit>
            <List className={classes.submenu}>
              <ListItemButton>
                <ListItemText primary="Option 1" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Option 2" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Option 3" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemText primary="Other 1" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Other 2" />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  )
})
