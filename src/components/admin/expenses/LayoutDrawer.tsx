import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@mui/styles'
import { SwipeableDrawer } from '@mui/material'
import { GridMenuIcon } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PeopleIcon from '@mui/icons-material/People'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Link from 'components/common/Link'

import { DrawerStore } from 'stores/expenses/DrawerStore'
import { routes } from 'common/routes'

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
  { text: 'Expenses', icon: <PeopleIcon />, path: routes.admin.expenses },
  { text: 'Add expense', icon: <AddCircleIcon />, path: routes.admin.createExpense },
]

export default function MyDrawer() {
  const { isDrawerOpen } = DrawerStore
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
      open={isDrawerOpen}
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
      </List>
    </SwipeableDrawer>
  )
}
