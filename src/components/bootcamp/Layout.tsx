import React from 'react'
import Link from 'next/link'
// import { styled, useTheme } from '@mui/material/styles'
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
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import StarBorder from '@mui/icons-material/StarBorder'
import { AccountCircle } from '@mui/icons-material'

import { routes } from 'common/routes'
import PodkrepiIcon from 'components/brand/PodkrepiIcon'

const drawerWidth = 240

// interface AppBarProps extends MuiAppBarProps {
//     open?: boolean
// }

// const AppBar = styled(MuiAppBar, {
//     shouldForwardProp: (prop: any) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//     transition: theme.transitions.create(['margin', 'width'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//     }),
//     ...(open && {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: `${drawerWidth}px`,
//         transition: theme.transitions.create(['margin', 'width'], {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//     }),
// }))

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar,
//     justifyContent: 'flex-end',
// }))

export default function Layout({ children }: ContainerProps) {
  // const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const [openCol, setOpenCol] = React.useState(true)

  const handleClick = () => {
    setOpenCol(!openCol)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
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
        <AppBar>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
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
        open={open}>
        <div>
          <IconButton onClick={handleDrawerClose}>{<ChevronLeftIcon />}</IconButton>
        </div>
        <Divider />
        <List>
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
}
