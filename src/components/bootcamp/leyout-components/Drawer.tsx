import { styled, Theme, CSSObject } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import { drawerWidth } from './styles'
import DrawerHeader from './DrawerHeader'
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { menuDrawer } from './menuDrawer'
import { styles } from './styles'

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
    width: `calc(${theme.spacing(8)} + 4px)`,
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

type Props = {
  open: boolean
}
export default function BootcampDrawer(props: Props) {
  const classes = styles()
  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <Typography
          variant="h6"
          sx={{
            marginRight: '36px',
          }}>
          Dashboard
        </Typography>
      </DrawerHeader>
      {/* <Divider /> */}
      <List sx={{ height: '100%', position: 'relative' }}>
        {menuDrawer.map((item) => (
          <ListItem
            button
            key={item.text}
            className={item.text == 'Настройки' ? classes.settings : 'none'}>
            <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
            <ListItemText className={classes.text} primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
