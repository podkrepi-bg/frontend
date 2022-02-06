import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  Typography,
  Divider,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled, useTheme, Theme } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { observer } from 'mobx-react'

import { DrawerStore } from 'stores/DrawerStore'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import DashboardMenu from 'components/layout/nav/DashboardMenu'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop: string) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }: { theme: Theme; open: boolean }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme, open }: { theme: Theme; open: boolean }) => ({
  backgroundColor: '#fff',
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const DrawerHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

type Props = {
  children: React.ReactNode
  title: string
}

export default observer(function DashboardDrawer({ title, children }: Props) {
  const { t } = useTranslation()
  const { isOpen, toggle } = DrawerStore
  const theme = useTheme()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={isOpen}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggle}
              edge="start"
              sx={{ mr: 2, ...(isOpen && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <a>
                <PodkrepiLogo />
              </a>
            </Link>
            <Typography variant="h6" noWrap component="div" sx={{ marginLeft: '16px' }}>
              {t('nav.dashboard.index')}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  {t('nav.dashboard.profile-menu.profile')}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  {t('nav.dashboard.profile-menu.settings')}
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{t('nav.dashboard.profile-menu.logout')}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
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
        <DrawerHeader>
          <IconButton onClick={toggle}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DashboardMenu />
      </Drawer>
      <Main open={isOpen}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
          {title}
        </Typography>
        {children}
      </Main>
    </Box>
  )
})
