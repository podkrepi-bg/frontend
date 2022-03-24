import { MoveToInboxRounded } from '@mui/icons-material'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import * as React from 'react'
import { Theme, CSSObject, styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import DrawerHeader from './DrawerHeader'
import { drawerWidth, styles } from './styles'
import SubMenu from './SubMenu'

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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
    width: `calc(${theme.spacing(7)} + 4px)`,
  },
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
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
  const classes = styles()

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
              <MoveToInboxRounded className={classes.icon} />
              <ListItemText primary="Inbox" className={classes.text} />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Starred">
            <ListItemIcon>
              <StarRoundedIcon className={classes.icon} />
              <ListItemText primary="Starred" className={classes.text} />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Send mail">
            <ListItemIcon>
              <EmailRoundedIcon className={classes.icon} />
              <ListItemText primary="Send mail" className={classes.text} />
            </ListItemIcon>
          </ListItem>
          <ListItem button key="Drafs">
            <ListItemIcon>
              <SaveAsRoundedIcon className={classes.icon} />
              <ListItemText primary="Drafs" className={classes.text} />
            </ListItemIcon>
          </ListItem>
          <SubMenu />
        </List>
      </Drawer>
    </>
  )
}

export default BootcampDrawer
