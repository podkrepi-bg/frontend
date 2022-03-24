import { MoveToInboxRounded } from '@mui/icons-material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import CancelScheduleSendRoundedIcon from '@mui/icons-material/CancelScheduleSendRounded'
import { Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import * as React from 'react'
import { Theme, CSSObject, styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import DrawerHeader from './DrawerHeader'

const openedMixin = (theme: Theme): CSSObject => ({
  width: 194,
  top: '7%',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(5)} + 4px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: 194,
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

type Props = { open: boolean }

function BootcampDrawer(props: Props) {
  return (
    <>
      <Drawer variant="permanent" open={props.open}>
        <DrawerHeader>
          <Typography variant="h6" marginRight="36px">
            Dashboard
          </Typography>
        </DrawerHeader>
        <List sx={{ height: '100%', position: 'relative' }}>
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
        </List>
      </Drawer>
    </>
  )
}

export default BootcampDrawer
