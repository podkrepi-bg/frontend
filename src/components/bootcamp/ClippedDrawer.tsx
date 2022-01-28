import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import HomeIcon from '@mui/icons-material/Home'
import BasicPopover from './BasicPopover'

const drawerWidth = 240

type Props = {
  children: React.ReactNode
  title: string
}

export default function ClippedDrawer({ children, title }: Props) {
  return (
    <Box sx={{ display: 'flex', textAlign: 'center' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'lightblue' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div">
            <PodkrepiLogo />
          </Typography>
          <AccountCircleIcon sx={{ color: '#32A9FE', fontSize: 32 }} />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItemButton component="a" href="/bootcamp/dashboard">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>
          <BasicPopover title="Pets">
            <List>
              <ListItemButton component="a" href="/bootcamp/dashboard/pets">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="All pets" />
              </ListItemButton>
              <ListItemButton component="a" href="/bootcamp/dashboard/pets/create">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Create pet" />
              </ListItemButton>
            </List>
          </BasicPopover>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h3" sx={{ marginBottom: 3 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Box>
  )
}
