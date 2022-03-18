import { Box, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import * as React from 'react'
import { MoveToInboxRounded } from '@mui/icons-material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded'

type Anchor = 'top' | 'left' | 'right' | 'bottom'

function DrawerList(anchor: Anchor) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }
      setState({ ...state, [anchor]: open })
    }

  return (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem button key="Inbox">
          <ListItemIcon>
            <MoveToInboxRounded />
            <ListItemText primary="Inbox" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Starred">
          <ListItemIcon>
            <StarRoundedIcon />
            <ListItemText primary="Starred" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Send mail">
          <ListItemIcon>
            <EmailRoundedIcon />
            <ListItemText primary="Send mail" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Drafs">
          <ListItemIcon>
            <SaveAsRoundedIcon />
            <ListItemText primary="Drafs" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Dashboard">
          <ListItemIcon>
            <DashboardRoundedIcon />
            <ListItemText primary="Dashboard" />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key="All mail">
          <ListItemIcon>
            <AllInboxRoundedIcon />
            <ListItemText primary="All mail" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Trash">
          <ListItemIcon>
            <DeleteOutlineRoundedIcon />
            <ListItemText primary="Trash" />
          </ListItemIcon>
        </ListItem>
        <ListItem button key="Spam">
          <ListItemIcon>
            <CancelScheduleSendRoundedIcon />
            <ListItemText primary="Spam" />
          </ListItemIcon>
        </ListItem>
      </List>
    </Box>
  )
}

export default DrawerList
