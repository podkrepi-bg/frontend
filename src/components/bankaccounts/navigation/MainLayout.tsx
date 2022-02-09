import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
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
import MenuIcon from '@mui/icons-material/Menu'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import NotificationsIcon from '@mui/icons-material/Notifications'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PanelFooter from './PanelFooter'
import { Avatar, Button, TextField, Typography } from '@mui/material'
import Snackbar from 'components/layout/Snackbar'
import PictureLogo from '/public/android-chrome-192x192.png'
import Image from 'next/image'
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

const DrawerHeader = styled('div')(({ theme }: any) => ({
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
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme }: any) => ({
  display: 'flex',
  flexDirection: 'row',
  background: 'none',
  boxShadow: 'none',
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  height: '64px',
  width: `100%`,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: any) => prop !== 'open' })(
  ({ theme, open, fullyClosed }: any) => ({
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

export default function MainLayout({ children }: any) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [fullyClosed, setFullyClose] = React.useState(false)
  const classes = useStyles()
  console.log('open:' + open, 'fullyClosed:' + fullyClosed)
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
        <List sx={{ p: '30px 17px 0 17px' }}>
          {['Задачи', 'Кампании', 'Доброволци', 'Плащания', 'Потребители', 'Документи'].map(
            (text, index) => (
              <ListItem button key={text} sx={{ px: '7px', borderRadius: '20px' }}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ),
          )}
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
