import React from 'react'
import Link from 'next/link'
import { observer } from 'mobx-react'
import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Collapse,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ContainerProps,
  AppBar,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { AccountCircle } from '@mui/icons-material'

import { routes } from '../../common/routes'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import { DrawerStore } from '../../stores/DrawerStore'

const drawerWidth = 240

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

export default observer(function Layout({ children }: ContainerProps) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [openCol, setOpenCol] = React.useState(true)
  const { isOpen, toggle } = DrawerStore

  const handleClick = () => {
    setOpenCol(!openCol)
  }

  const handleDrawerOpen = () => {
    toggle()
  }

  const handleDrawerClose = () => {
    toggle()
  }

  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )

  return (
    <Container maxWidth={false} disableGutters>
      <Box>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}
              onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Link href={routes.index}>
              <a>
                <PodkrepiIcon />
              </a>
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}>
              Admin panel
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit">
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}>
        <div className={classes.closeNavBtn}>
          <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon />}</IconButton>
        </div>
        <Divider />
        <List className={classes.submenu}>
          <Link href={routes.bootcamp.index}>
            <ListItem button key="All Bootcampers">
              <ListItemText primary="All Bootcampers" />
            </ListItem>
          </Link>
          <Divider />
          <Link href={routes.bootcamp.create}>
            <ListItem button key="Create">
              <ListItemText primary="Create" />
            </ListItem>
          </Link>
          <Divider />
          {['Somth', 'Somth'].map((text, index) => (
            <>
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
              <Divider />
            </>
          ))}

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="ColapseItem" />
            {openCol ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </List>
        <Collapse in={openCol} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Nested" />
            </ListItemButton>
          </List>
        </Collapse>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {children}
      </Container>

      <footer
        style={{
          position: 'fixed',
          left: '0',
          bottom: '0',
          width: '100%',
          backgroundColor: '#32a9fe',
          textAlign: 'center',
          height: '6.8%',
        }}>
        <Typography variant="inherit">&copy; All Rights Reserved</Typography>
      </footer>
    </Container>
  )
})
