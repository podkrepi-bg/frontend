import Link from 'next/link'
import Image from 'next/image'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { makeStyles, useTheme } from '@mui/styles'
import { useRouter } from 'next/router'
import MuiDrawer from '@mui/material/Drawer'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  CssBaseline,
  IconButton,
  List,
  Box,
  Button,
  TextField,
  Typography,
} from '@mui/material'
import { Notifications, Settings, MenuOpen, ChevronRight, GppGood } from '@mui/icons-material'

import { routes } from 'common/routes'
import Snackbar from 'components/layout/Snackbar'
import PrivateMenu from 'components/layout/nav/PrivateMenu'
import PictureLogo from '/public/android-chrome-192x192.png'

import PanelFooter from './PanelFooter'
import { menuItems } from './adminMenu'
import CustomListItem from './CustomListItem'

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
    justifyContent: 'flex-end',
  },
  appbarWrapper: {
    display: 'flex',
    width: 'calc(100% - 24px)',
    position: 'relative',
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

// @ts-expect-error bad MUI types for styled.div
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

export default function AdminLayout({ children }: Props) {
  const theme = useTheme()
  const router = useRouter()
  const classes = useStyles()

  const initialOpen = useMemo<boolean>(() => {
    const item = window.localStorage.getItem('menu-open')
    if (item) {
      return Boolean(JSON.parse(item))
    }
    return false
  }, [])

  const [open, setOpen] = useState<boolean>(initialOpen)

  useEffect(() => {
    window.localStorage.setItem('menu-open', JSON.stringify(open))
  }, [open])

  const toggleMenu = useCallback(() => setOpen((open) => !open), [])
  return (
    <Box className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ p: 0, display: 'flex' }}>
        <Box className={classes.appbarWrapper}>
          <Box className={classes.drawerHeader}>
            <Box className={classes.logoWrapper}>
              <Link href={routes.admin.index}>
                <a>
                  <Image src={PictureLogo} width={40} height={40} />
                </a>
              </Link>
            </Box>
          </Box>
          <Box className={classes.appbarHeader}>
            {/* <TextField id="outlined-search" label="Търси" type="search" size="small" /> */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <IconButton>
                <Notifications color="info" />
              </IconButton>
              <PrivateMenu />
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Drawer variant="permanent" open={open} theme={theme}>
        <DrawerHeader />
        <List sx={{ p: '2rem .5rem', height: '100%', position: 'relative' }}>
          {menuItems.map(({ label, icon: Icon, href }, index) => (
            <CustomListItem
              key={index}
              selected={href !== '#' && router.asPath.includes(href)}
              icon={<Icon />}
              label={label}
              onClick={() => router.push(href)}
            />
          ))}
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
      <PanelFooter>
        <Button sx={{ color: 'white' }}>
          <GppGood />
        </Button>
        <Typography color="white">{'Вие сте логнат като администратор'}</Typography>
      </PanelFooter>
      <Snackbar />
    </Box>
  )
}
