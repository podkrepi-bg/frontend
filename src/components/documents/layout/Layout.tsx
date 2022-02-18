import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import { makeStyles } from '@mui/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { routes } from 'common/routes'
import { TextField } from '@mui/material'
import { AccountCircle, ChevronRight, MenuOpen, Notifications, Settings } from '@mui/icons-material'

import Logo from '/public/android-chrome-192x192.png'
import CustomListItem from './CustomListItem'
import { menuItems } from './adminMenu'
import Snackbar from 'components/layout/Snackbar'
import Footer from './Footer'
import ProfileMenu from './ProfileMenu'

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
    marginLeft: '6rem',
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
  ({ theme, open }: { theme: Theme; open: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const theme = useTheme()
  const router = useRouter()
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const toggleMenu = React.useCallback(() => setOpen((open: boolean) => !open), [])

  return (
    <Box className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ p: 0, display: 'flex' }}>
        <Box className={classes.appbarWrapper}>
          <Box className={classes.drawerHeader}>
            <Box className={classes.logoWrapper}>
              <Link href={routes.admin.index}>
                <a>
                  <Image src={Logo} width={40} height={40} />
                </a>
              </Link>
            </Box>
          </Box>
          <Box className={classes.appbarHeader}>
            <TextField id="outlined-search" label="Търси" type="search" size="small" />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <IconButton>
                <Notifications color="primary" />
              </IconButton>
              <IconButton>
                <AccountCircle color="primary" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <List sx={{ p: '2rem .5rem', height: '100%', position: 'relative' }}>
          {menuItems.map(
            ({ label, icon: Icon, href }: { label: string; icon: any; href: string }, index) => (
              <CustomListItem
                key={index}
                selected={router.asPath.includes(href)}
                icon={<Icon />}
                label={label}
                onClick={() => router.push(href)}
              />
            ),
          )}
          <CustomListItem icon={open ? <MenuOpen /> : <ChevronRight />} onClick={toggleMenu} />
          <CustomListItem
            icon={<Settings />}
            label={'Настройки'}
            sx={{ position: 'absolute', bottom: '1rem' }}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader />
        {children}
      </Box>
      <Snackbar />
      <Footer />
    </Box>
  )
}
