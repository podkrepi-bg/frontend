import React from 'react'
import { Container, Drawer } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import Layout from 'components/layout/Layout'
import DetailsModal from '../DetailsModal'
import CarsGrid from '../CarsGrid'
import CarsInput from '../CarsInput'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
/* import Drawer from '@mui/material/Drawer' */
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import HomeIcon from '@mui/icons-material/Home'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CampaignIcon from '@mui/icons-material/Campaign'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import PaymentIcon from '@mui/icons-material/Payment'
import GroupIcon from '@mui/icons-material/Group'
import SummarizeIcon from '@mui/icons-material/Summarize'
import SettingsIcon from '@mui/icons-material/Settings'

const drawerWidth = 200
const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
    background: '#eeeeee',
    border: 'none',
    position: 'relative',
    zIndex: 0,
    height: 'calc(100vh - 200px)',
  },
  root: {},
})
const menuItems = [
  {
    text: 'Home',
    icon: <HomeIcon color="secondary" />,
    path: '/',
  },
  {
    text: 'Tasks',
    icon: <AssignmentIcon color="secondary" />,
    path: '/tasks',
  },
  {
    text: 'Campaigns',
    icon: <CampaignIcon color="secondary" />,
    path: '/campaigns',
  },
  {
    text: 'Volunteers',
    icon: <VolunteerActivismIcon color="secondary" />,
    path: '/volunteers',
  },
  {
    text: 'Payments',
    icon: <PaymentIcon color="secondary" />,
    path: '/payments',
  },
  {
    text: 'Users',
    icon: <GroupIcon color="secondary" />,
    path: '/users',
  },
  {
    text: 'Documents',
    icon: <SummarizeIcon color="secondary" />,
    path: '/documents',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon color="secondary" />,
    path: '/settings',
  },
]

export default function ClippedDrawer() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography variant="h5"> Something</Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
