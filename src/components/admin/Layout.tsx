import * as React from 'react'
import Snackbar from 'components/layout/Snackbar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import AppsIcon from '@mui/icons-material/Apps'
import PeopleIcon from '@mui/icons-material/People'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { makeStyles } from '@mui/styles'
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
  Menu,
  MenuItem,
} from '@mui/material'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import DrawerStore from 'stores/DrawerStore'

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
const store = new DrawerStore()

function CustomLayout({ children }: { children: any }) {
  const classes = useStyles()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(store.isDrawerOpen)
  const [openMore, setOpenMore] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
    if (isDrawerOpen) {
      store.hide()
    } else {
      store.show()
    }
  }

  const toggleMore = () => {
    setOpenMore(!openMore)
  }

  const navLinks = [
    { icon: <PeopleIcon />, name: 'All', href: '/admin/coordinators' },
    {
      icon: <PersonAddIcon />,
      name: 'Create',
      href: '/admin/coordinators/create',
    },
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
            onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <PodkrepiIcon className={classes.logo} />
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin panel
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer} variant="persistent">
        <List>
          <div className={classes.closeNavBtn}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          {navLinks.map((item) => (
            <ListItemButton key={item.name} color="black">
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link href={item.href} passHref>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          ))}
          <ListItemButton onClick={toggleMore}>
            <ListItemText primary="More" />
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
