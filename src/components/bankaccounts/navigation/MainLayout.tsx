import * as React from 'react'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  CssBaseline,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Box,
} from '@mui/material'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Button, TextField, Typography } from '@mui/material'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import SettingsIcon from '@mui/icons-material/Settings'
import MenuIcon from '@mui/icons-material/Menu'
import AddIcon from '@mui/icons-material/Add'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import Image from 'next/image'
import Snackbar from 'components/layout/Snackbar'
import PictureLogo from '/public/android-chrome-192x192.png'
import PanelFooter from './PanelFooter'
import { useRouter } from 'next/router'
const drawerWidth = 200

const useStyles = makeStyles({
  drawerHeader: {
    width: drawerWidth,
    height: 64,
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 19px 0 24px',
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    paddingRight: '24px',
  },
  appbarHeader: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: 64,
    marginLeft: drawerWidth,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appbarWrapper: {
    display: 'flex',
    width: 'calc(100% - 24px)',
    position: 'relative',
    background: 'white',
    paddingRight: '16px',
  },
  logoWrapper: {
    width: 150,
    display: 'flex',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
  },
})

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  border: 'none',
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

const fullyClosedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  border: 'none',
  width: 0,
  zIndex: -1,
})

const DrawerHeader = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: string) => prop !== 'open',
})<AppBarProps>(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  background: 'none',
  boxShadow: 'none',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  height: '64px',
  width: `100%`,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open, fullyClosed }: { theme: Theme; open: boolean; fullyClosed: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open &&
      !fullyClosed && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),

    ...(!open &&
      fullyClosed && {
        ...fullyClosedMixin(theme),
        '& .MuiDrawer-paper': fullyClosedMixin(theme),
      }),
  }),
)

type Props = {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  const [open, setOpen] = React.useState(false)
  const [fullyClosed, setFullyClose] = React.useState(false)
  const classes = useStyles()
  const router = useRouter()
  return (
    <Box className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ p: 0, display: 'flex' }}>
        <Box className={classes.appbarWrapper}>
          <Box className={classes.drawerHeader}>
            <Box className={classes.logoWrapper}>
              <Image src={PictureLogo} width={40} height={40}></Image>
            </Box>
            <IconButton
              sx={{ p: '5px', borderRadius: '10px' }}
              color="primary"
              onClick={() => {
                if (fullyClosed && !open) {
                  setFullyClose(false)
                } else if (!fullyClosed) setOpen(!open)
              }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box className={classes.appbarHeader}>
            <TextField id="outlined-search" label="search" type="search" size="small" />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <IconButton>
                <NotificationsIcon color="primary" />
              </IconButton>
              <IconButton>
                <AccountCircleIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open} fullyClosed={fullyClosed}>
        <DrawerHeader></DrawerHeader>
        <List sx={{ p: '30px 17px 30px 17px', height: '100%', position: 'relative' }}>
          {['All people', 'Add person'].map((text, index) => (
            <ListItem button key={text} sx={{ px: '7px', borderRadius: '20px' }}>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <IconButton
                    onClick={() => {
                      router.push('/admin/person')
                    }}>
                    <FormatListBulletedIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      router.push('/admin/person/add')
                    }}>
                    <AddIcon />
                  </IconButton>
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem
            button
            sx={{ px: '7px', borderRadius: '20px', position: 'absolute', bottom: '15px' }}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Настройки'} />
          </ListItem>
        </List>
      </Drawer>
      <div
        style={{
          width: '24px',
          height: '100vh',
          position: 'relative',
          marginLeft: fullyClosed ? 0 : '-24px',
          transition: '0.2s ease-in-out 0s',
        }}></div>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader></DrawerHeader>
        {children}
      </Box>
      <PanelFooter>
        <Button
          sx={{ color: 'white' }}
          onClick={() => {
            setFullyClose(!fullyClosed)
            setOpen(false)
          }}>
          {fullyClosed ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </Button>
        <Typography color="white">Вие сте логнат като администратор</Typography>
      </PanelFooter>
      <Snackbar />
    </Box>
  )
}
