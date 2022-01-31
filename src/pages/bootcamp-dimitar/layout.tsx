import * as React from 'react'
import Snackbar from 'components/layout/Snackbar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AppsIcon from '@mui/icons-material/Apps'
import PeopleIcon from '@mui/icons-material/People'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'next-i18next'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
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
  Container,
  Typography,
} from '@mui/material'
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

function CustomLayout({ children }: { children: any }) {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

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
    { icon: <PeopleIcon />, name: 'All bootcampers', href: '/bootcamp-dimitar' },
    { icon: <PersonAddIcon />, name: 'Create', href: '/bootcamp-dimitar/create' },
    { icon: <AppsIcon />, name: 'Other', href: '#' },
  ]
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <PodkrepiIcon className={classes.logo} />
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
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
        </List>
      </Drawer>
      <Container maxWidth="lg">{children}</Container>
      <footer style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <p style={{ textAlign: 'center' }}>footer text</p>
      </footer>
      <Snackbar></Snackbar>
    </>
  )
}

export default CustomLayout
