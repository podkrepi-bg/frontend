import { HomeOutlined, InfoOutlined } from '@mui/icons-material'
import CampaignIcon from '@mui/icons-material/Campaign'
import PeopleIcon from '@mui/icons-material/People'
import { makeStyles } from '@mui/styles'
import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { SwipeableDrawer } from '@mui/material'
import { GridMenuIcon } from '@mui/x-data-grid'
import People from '@mui/icons-material/People'
import PermMedia from '@mui/icons-material/PermMedia'
import Dns from '@mui/icons-material/Dns'
import Public from '@mui/icons-material/Public'
import { useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
]

export default function MyDrawer(props: any) {
  const [open, setOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const router = useRouter()
  const classes = useStyles()

  return (
    <SwipeableDrawer
      elevation={2}
      ModalProps={{
        hideBackdrop: true,
      }}
      disableBackdropTransition={true}
      onOpen={() => console.log('opened')}
      onClose={() => console.log('closed')}
      open={props.open}
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
        <ListItem
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            setOpen((prev) => !prev)
            setSubmenuOpen(false)
          }}>
          <ListItemIcon>{<GridMenuIcon />}</ListItemIcon>
          <ListItemText primary={`Press for submenus`} />
        </ListItem>
        {open && (
          <List>
            <ListItem>
              <ListItemIcon>{<AddBoxIcon />}</ListItemIcon>
              <ListItemText primary="Add" />
            </ListItem>
            <ListItem>
              <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
              <ListItemText primary="Remove" />
            </ListItem>
            <ListItem>
              <ListItemIcon>{<EditIcon />}</ListItemIcon>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setSubmenuOpen((prev) => !prev)
              }}>
              <ListItemIcon>{<GridMenuIcon />}</ListItemIcon>
              <ListItemText primary="Submenu of the submenu?" />
            </ListItem>
            {submenuOpen && (
              <List>
                <ListItem>
                  <ListItemIcon>{<DeleteIcon />}</ListItemIcon>
                  <ListItemText primary="Remove" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>{<EditIcon />}</ListItemIcon>
                  <ListItemText primary="Edit" />
                </ListItem>
              </List>
            )}
          </List>
        )}
      </List>
    </SwipeableDrawer>
  )
}
