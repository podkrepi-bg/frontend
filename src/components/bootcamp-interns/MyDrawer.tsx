import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { useContext, useState } from 'react'
import { SwipeableDrawer } from '@mui/material'
import { GridMenuIcon } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PeopleIcon from '@mui/icons-material/People'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { DrawerContext } from 'context/SwipeableDrawerContext'

export const drawerWidth = 200

const useStyles = makeStyles(() => {
  return {
    drawer: {
      width: drawerWidth,
      position: 'absolute',
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
      backgroundColor: '#bebaba',
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
  const { isOpen }: any = useContext(DrawerContext)
  const [open, setOpen] = useState<boolean>(false)
  const [submenuOpen, setSubmenuOpen] = useState<boolean>(false)
  const router = useRouter()
  const classes = useStyles()

  return (
    <SwipeableDrawer
      elevation={2}
      ModalProps={{
        hideBackdrop: true,
      }}
      onOpen={() => null}
      onClose={() => null}
      open={isOpen}
      className={classes.drawer}
      variant="persistent"
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
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
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
