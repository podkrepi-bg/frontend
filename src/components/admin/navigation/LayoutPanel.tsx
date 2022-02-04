import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Drawer, Toolbar, Box, Theme, Typography } from '@mui/material'
import { DrawerStore } from 'stores/cars/DrawerStore'
import CssBaseline from '@mui/material/CssBaseline'
import ProfileMenuItems from './ProfileMenuItems'
import DrawerListItems from './DrawerListItems'
import { styled } from '@mui/material/styles'
import Notifications from '../tasks/Snackbar'
import React, { useState } from 'react'
import DrawerHeader from './DrawerHeader'
import DrawerIcons from './DrawerIcons'
import { observer } from 'mobx-react'
import PanelFooter from './Footer'

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

type Props = {
  children: React.ReactNode
}

export default observer(function PersistentDrawerLeft({ children }: Props) {
  const { isDrawerOpen, openDrawer, closeDrawer } = DrawerStore
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDrawerOpen = () => {
    openDrawer()
  }
  const handleDrawerClose = () => {
    closeDrawer()
  }
  return (
    <Box sx={{ display: 'flex', py: 10 }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen} style={{ background: 'white' }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
            position: 'relative',
          }}>
          <DrawerIcons drawerOpen={isDrawerOpen} handleDrawerOpen={handleDrawerOpen} />
          <Typography
            sx={{
              color: '#7d7d7d',
              width: '100%',
              position: 'absolute',
              zIndex:-1
            }}
            textAlign="center"
            variant="h5">
            Админ панел
          </Typography>
          <ProfileMenuItems
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
            isOpen={isOpen}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{ elevation: 10 }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: { lg: drawerWidth, md: drawerWidth, sm: drawerWidth, xs: '100%' },
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}>
        <DrawerHeader handleDrawerClose={handleDrawerClose} />
        <DrawerListItems />
      </Drawer>
      <Main open={isDrawerOpen}>{children}</Main>
      {/*  <PanelFooter /> */}
      <Notifications />
    </Box>
  )
})
