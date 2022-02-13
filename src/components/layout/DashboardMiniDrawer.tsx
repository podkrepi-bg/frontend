import { makeStyles } from '@mui/styles'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Toolbar, TextField, Box, CssBaseline, Typography, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { observer } from 'mobx-react'

import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import ProfileIconMenu from 'components/common/ProfileIconMenu'
import { DrawerStore } from 'stores/DrawerStore'

import DashboardMenu from './nav/DashboardMenu'

const drawerWidth = 194

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  border: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  border: 'none',
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

const fullClosedMixin = (theme: Theme): CSSObject => ({
  border: 'none',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: 0,
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: '#fff',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#fff',
  boxShadow: 'none',
  padding: '13px 41px 9px',
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})(({ theme, open, fullClosed }: { theme: Theme; open: boolean; fullClosed: boolean }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open &&
    !fullClosed && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  ...(!open &&
    fullClosed && {
      ...fullClosedMixin(theme),
      '& .MuiDrawer-paper': fullClosedMixin(theme),
    }),
}))

type Props = {
  children: React.ReactNode
}

const useStyles = makeStyles(() => {
  return {
    toolbar: {
      minHeight: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0',
    },
  }
})

export default observer(function DashboardMiniDrawer({ children }: Props) {
  const { isOpen, toggle, isFullClosed, toggleFullClosed } = DrawerStore
  const classes = useStyles()

  const handleHamburgerClick = () => {
    if (isFullClosed) {
      toggleFullClosed()
    }
    toggle()
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className={classes.toolbar}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
            <PodkrepiIcon />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleHamburgerClick}
              edge="start"
              sx={{
                marginRight: '18px',
                marginLeft: '80px',
                color: '#0098E3',
                borderRadius: '8px',
                background: '#F1FBFF',
                padding: '4px',
              }}>
              <MenuIcon />
            </IconButton>
            <TextField
              id="outlined-search"
              label="Search field"
              type="search"
              sx={{ height: '40px' }}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                style: {
                  height: '100%',
                  width: '322px',
                },
                endAdornment: <SearchIcon />,
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NotificationsIcon
              sx={{
                padding: '4px',
                fontSize: '32px',
                background: '#F1FBFF',
                borderRadius: '8px',
                marginRight: '9px',
                color: '#0098E3',
              }}
            />
            <ProfileIconMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={isOpen} fullClosed={isFullClosed}>
        <DashboardMenu />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, paddingRight: 3, height: '100vh', mb: '-40px', overflow: 'hidden' }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  )
})
