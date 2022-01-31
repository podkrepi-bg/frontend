import React from 'react'
import {
  AppBar,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  Link,
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

export default function BootcampNavBar() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [openMore, setOpenMore] = React.useState(false)
  const { t } = useTranslation()

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const toggleMore = () => {
    setOpenMore(!openMore)
  }

  const navLinks = [
    { icon: <PeopleIcon />, name: t('bootcamp:nav.all'), href: routes.bootcamp.index },
    { icon: <PersonAddIcon />, name: t('bootcamp:nav.add'), href: routes.bootcamp.add },
    { icon: <AppsIcon />, name: t('bootcamp:nav.other'), href: '#' },
  ]

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Link href={routes.index}>
          <PodkrepiIcon className={classes.logo} />
        </Link>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {t('bootcamp:nav.title')}
        </Typography>
        <ProfileMenu />
      </Toolbar>
      <Drawer variant="persistent" anchor="left" open={open}>
        <List>
          <div className={classes.closeNavBtn}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {navLinks.map((item) => (
            <ListItemButton key={item.name} component="a" href={item.href} color="black">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
          <ListItemButton onClick={toggleMore}>
            <ListItemText primary={t('bootcamp:nav.more')} />
            {openMore ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openMore} timeout="auto" unmountOnExit>
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
}
