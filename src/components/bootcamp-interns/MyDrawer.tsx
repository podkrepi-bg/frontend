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
import AddCircleIcon from '@mui/icons-material/AddCircle'
export const drawerWidth = 200

const useStyles = makeStyles((theme) => {
  return {
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#f4f4f4',
    },
    logo: {
      width: `calc(100% - 50px)`,
      paddingBottom: '30px',
      marginTop: '10px',
    },
    active: {
      backgroundColor: '#d4d1ee',
    },
    item: {
      margin: '15px 0',
    },
  }
})

const menuItems = [
  { text: 'Interns', icon: <PeopleIcon />, path: '/bootcamp-interns' },
  { text: 'Add intern', icon: <AddCircleIcon />, path: '/bootcamp-interns/create' },
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
