import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import {
  Toolbar,
  TextField,
  Box,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'

import PodkrepiIcon from 'components/brand/PodkrepiIcon'
import ProfileIconMenu from 'components/common/ProfileIconMenu'

const drawerWidth = 240

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
  padding: '13px 13px 9px',
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  title: string
}

const useStyles = makeStyles(() => {
  return {
    toolbar: {
      minHeight: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  }
})

export default function DashboardMiniDrawer({ children, title }: Props) {
  const [open, setOpen] = useState(true)
  const classes = useStyles()

  const toggleDrawer = () => setOpen((old) => !old)

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
              onClick={toggleDrawer}
              edge="start"
              sx={{
                marginRight: '36px',
                marginLeft: '90px',
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
                padding: '4px ',
                fontSize: '32px',
                background: '#F1FBFF',
                borderRadius: '8px',
                marginRight: '9px',
              }}
            />
            <ProfileIconMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Divider />
        <List sx={{ mt: 8 }}>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  )
}
