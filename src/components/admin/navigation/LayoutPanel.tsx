import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { Drawer, Toolbar, Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ModalContext } from 'context/ModalContext'
import ProfileMenuItems from './ProfileMenuItems'
import DrawerListItems from './DrawerListItems'
import { styled } from '@mui/material/styles'
import Notifications from '../tasks/Snackbar'
import { useContext, useState } from 'react'
import DrawerHeader from './DrawerHeader'
import DrawerIcons from './DrawerIcons'
import PanelFooter from './Footer'
const drawerWidth = 240
const Main = styled('main', { shouldForwardProp: (prop: any) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }: any) => ({
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
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }: any) => ({
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

export default function PersistentDrawerLeft({ children }: any) {
  const { drawerOpen, setDrawerOpen }: any = useContext(ModalContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={drawerOpen} style={{ background: 'white' }}>
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
          <DrawerIcons drawerOpen={drawerOpen} handleDrawerOpen={handleDrawerOpen} />
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
        open={drawerOpen}>
        <DrawerHeader handleDrawerClose={handleDrawerClose} />
        <DrawerListItems />
      </Drawer>
      <Main open={drawerOpen}>{children}</Main>
      <PanelFooter />
      <Notifications />
    </Box>
  )
}
