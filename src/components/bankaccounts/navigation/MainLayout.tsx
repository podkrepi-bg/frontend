import * as React from 'react'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import PanelFooter from './PanelFooter'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { Avatar, TextField } from '@mui/material'
import Snackbar from 'components/layout/Snackbar'
const drawerWidth = 240

const useStyles = makeStyles({
  drawerHeader: {
    width: drawerWidth,
    height: 64,
    position: 'absolute',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 23px 0 7px',
  },
  wrapper: {
    display: 'flex',
    position: 'relative',
    minHeight: '100vh',
    paddingRight: '24px',
  },
  appbarHeader: {
    width: 'calc(100% - 240px)',
    height: 64,
    marginLeft: '240px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appbarWrapper: {
    display: 'flex',
    width: 'calc(100% - 24px)',
    position: 'relative',
    background: 'white',
    paddingInline: '16px',
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
  ({ theme, open }: any) => ({
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

export default function MainLayout({ children }: any) {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  return (
    <Box className={classes.wrapper}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ p: 0, display: 'flex' }}>
        <Box className={classes.appbarWrapper}>
          <Box className={classes.drawerHeader}>
            <Box className={classes.logoWrapper}>
              <PodkrepiLogo variant="adaptive"></PodkrepiLogo>
            </Box>
            <IconButton
              sx={{ p: '7px', borderRadius: '10px' }}
              color="primary"
              onClick={() => {
                setOpen(!open)
              }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box className={classes.appbarHeader}>
            <TextField id="outlined-search" label="search" type="search" size="small" />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <NotificationsIcon />
              <AccountCircleIcon />
            </Box>
          </Box>
        </Box>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <List sx={{ p: '30px 16px 0 16px' }}>
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
      <Box component="main" sx={{ flexGrow: 1 }}>
        <DrawerHeader></DrawerHeader>
        {children}
      </Box>

      <PanelFooter />
      <Snackbar />
    </Box>
  )
}
