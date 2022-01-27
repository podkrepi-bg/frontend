import { HomeOutlined, InfoOutlined } from '@mui/icons-material'
import CampaignIcon from '@mui/icons-material/Campaign'
import PeopleIcon from '@mui/icons-material/People'
import { makeStyles } from '@mui/styles'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Drawer from '@mui/material/Drawer'
import { createStyles } from '@mui/styles'
import theme from 'common/theme'
import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { useRouter } from 'next/router'
import AccessibilityNewOutlinedIcon from '@mui/icons-material/AccessibilityNewOutlined'
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined'

export const drawerWidth = 200

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.light,
    },
    logo: {
      width: `calc(100% - 50px)`,
      paddingBottom: '30px',
      marginTop: '10px',
    },
    active: {
      backgroundColor: 'f4f4f4',
    },
    item: {
      margin: '15px 0',
    },
  }
})

const menuItems = [
  { text: 'Home', icon: <HomeOutlined color="primary" />, path: '/' },
  { text: 'Interns', icon: <PeopleIcon color="primary" />, path: '/bootcamp-interns' },
  { text: 'Campaigns', icon: <CampaignIcon color="primary" />, path: '/campaigns' },
  { text: 'About Project', icon: <InfoOutlined color="primary" />, path: '/about-project' },
  {
    text: 'Become a supporter',
    icon: <AccessibilityNewOutlinedIcon color="primary" />,
    path: '/support',
  },
  { text: 'Contacts', icon: <ContactPageOutlinedIcon color="primary" />, path: '/contact' },
]

export default function MyDrawer() {
  const router = useRouter()
  const classes = useStyles()
  return (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      anchor="left"
      classes={{ paper: classes.drawerPaper }}>
      <div className={classes.logo}>
        <PodkrepiLogo variant="adaptive" />
      </div>
      <List>
        {menuItems.map((item) => (
          <ListItem
            onClick={() => router.push(item.path)}
            button
            key={item.text}
            className={
              router.pathname == item.path ? `${classes.active} ${classes.item}` : classes.item
            }>
            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText className={classes.text} primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
