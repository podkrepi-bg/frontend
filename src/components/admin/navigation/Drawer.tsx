import { Drawer } from '@mui/material'
import ListItemButton from '@mui/material/ListItemButton'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { makeStyles } from '@mui/styles'
import HomeIcon from '@mui/icons-material/Home'
import AssignmentIcon from '@mui/icons-material/Assignment'
import CampaignIcon from '@mui/icons-material/Campaign'
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'
import PaymentIcon from '@mui/icons-material/Payment'
import GroupIcon from '@mui/icons-material/Group'
import SummarizeIcon from '@mui/icons-material/Summarize'
import SettingsIcon from '@mui/icons-material/Settings'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
const drawerWidth = 150
const baseUrl = '/admin/panel'
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
  },
  root: { height: 'calc(100vh - 400px)' },
  active: {
    background: '#cbe9fe',
  },
})
const menuItems = [
  {
    text: 'Home',
    icon: <HomeIcon color="action" />,
    path: `${baseUrl}/home`,
    name: 'home',
  },
  {
    text: 'Задачи',
    icon: <AssignmentIcon color="action" />,
    path: `${baseUrl}/tasks`,
    name: 'tasks',
  },
  {
    text: 'Кампании',
    icon: <CampaignIcon color="action" />,
    path: `${baseUrl}/campaigns`,
    name: 'campaigns',
  },
  {
    text: 'Доброволци',
    icon: <VolunteerActivismIcon color="action" />,
    path: `${baseUrl}/volunteers`,
    name: 'volunteers',
  },
  {
    text: 'Плащания',
    icon: <PaymentIcon color="action" />,
    path: `${baseUrl}/payments`,
    name: 'payments',
  },
  {
    text: 'Потребители',
    icon: <GroupIcon color="action" />,
    path: `${baseUrl}/users`,
    name: 'users',
  },
  {
    text: 'Документи',
    icon: <SummarizeIcon color="action" />,
    path: `${baseUrl}/documents`,
    name: 'documents',
  },
  {
    text: 'Настройки',
    icon: <SettingsIcon color="action" />,
    path: `${baseUrl}/settings`,
    name: 'settings',
  },
]

export default function ClippedDrawer() {
  const { t } = useTranslation()
  const router = useRouter()
  const { pathname } = router
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}>
        <div>
          <Typography variant="body2" sx={{ textAlign: 'left', margin: '20px 0 56px 20px' }}>
            LOGO <br />
            ЧЕРНО БЯЛО
          </Typography>
        </div>
        <List>
          {menuItems.map((item) => (
            <ListItem
              className={pathname === item.path ? classes.active : undefined}
              key={item.text}
              disablePadding>
              <Link href={item.path}>
                <ListItemButton disableGutters sx={{ padding: '20px 10px' }}>
                  <ListItemIcon sx={{ minWidth: '35px' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  )
}
