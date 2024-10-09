import { useState, useCallback, useEffect, useMemo } from 'react'
import { useTheme } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import { IconButton, List, Box, Button, Typography } from '@mui/material'
import { Notifications, Settings, MenuOpen, ChevronRight, GppGood } from '@mui/icons-material'

import Snackbar from 'components/client/layout/Snackbar'

import { items } from './adminMenu'
import HoverMenu from './HoverMenu'
import PanelFooter from './PanelFooter'
import CustomListItem from './CustomListItem'
import AdminMenu from 'components/client/layout/nav/AdminMenu'
import Link from 'next/link'
import { routes } from 'common/routes'
import PictureLogo from '/public/android-chrome-192x192.png'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { isAdmin } from 'common/util/roles'

import NotFoundPage from '../errors/NotFoundPage/NotFoundPage'

const PREFIX = 'AdminLayout'
const drawerWidth = 200

const classes = {
  wrapper: `${PREFIX}-wrapper`,
  appbarHeader: `${PREFIX}-appbarHeader`,
}

const StyledBox = styled(Box)({
  [`&.${classes.wrapper}`]: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    paddingRight: '24px',
  },
  [`& .${classes.appbarHeader}`]: {
    width: `calc(100% - ${drawerWidth}px)`,
    height: 64,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop: string) => prop !== 'open' })(
  ({ theme, open }: { theme?: Theme; open: boolean }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme as Theme),
      '& .MuiDrawer-paper': openedMixin(theme as Theme),
    }),
    ...(!open && {
      ...closedMixin(theme as Theme),
      '& .MuiDrawer-paper': closedMixin(theme as Theme),
    }),
  }),
)

type Props = {
  children: React.ReactNode
}

export default function AdminLayout({ children }: Props) {
  const theme = useTheme()
  const session = useSession()
  if (!isAdmin(session.data)) {
    return <NotFoundPage />
  }
  const initialOpen = useMemo<boolean>(() => {
    const item = typeof window !== 'undefined' ? window.localStorage.getItem('menu-open') : false
    if (item) {
      return Boolean(JSON.parse(item))
    }
    return false
  }, [])

  const [open, setOpen] = useState<boolean>(initialOpen)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('menu-open', JSON.stringify(open))
    }
  }, [open])

  const toggleMenu = useCallback(() => setOpen((open) => !open), [])
  return (
    <StyledBox className={classes.wrapper}>
      <Drawer variant="permanent" open={open}>
        <Box
          sx={{
            display: 'flex',
            position: 'absolute',
            left: 5,
            top: 9,
            // padding: theme.spacing(0, 1),
          }}>
          <Link href={routes.admin.index} passHref>
            {/* A11Y TODO: Translate alt text */}
            <Image src={PictureLogo} width={40} height={40} alt={'logo'} />
          </Link>
        </Box>
        <DrawerHeader />
        <List sx={{ p: '2rem .5rem', height: '100%', position: 'relative' }}>
          {items.map(({ items, menu, icon }, index) => (
            <HoverMenu isOpen={open} key={index} menu={menu} icon={icon} items={items} />
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
        <DrawerHeader>
          <Box className={classes.appbarHeader}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingRight: 15 }}>
              <IconButton>
                <Notifications color="info" />
              </IconButton>
              <AdminMenu />
            </Box>
          </Box>
        </DrawerHeader>
        {children}
      </Box>
      <PanelFooter>
        <Button sx={{ color: theme.palette.common.white }}>
          <GppGood />
        </Button>
        <Typography color={theme.palette.common.white}>
          {'Вие сте логнат като администратор'}
        </Typography>
      </PanelFooter>
      <Snackbar />
    </StyledBox>
  )
}
