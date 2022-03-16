import { CSSObject, styled, Theme } from '@mui/material/styles'
import { drawerWidth, styles } from './styles'
import MuiDrawer from '@mui/material/Drawer'
import DrawerHeader from './DrawerHeader'
import { Typography, List } from '@mui/material'
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

function BootcampDrawer(props: Props) {
  const classes = styles()

  return (
    <Drawer variant="permanent" open={props.open}>
      <DrawerHeader>
        <Typography variant="h6" sx={{ marginRight: '36px' }}>
          Dashboard
        </Typography>
      </DrawerHeader>
      <List sx={{ height: '100%', position: 'relative' }}>
        <SubMenu />
      </List>
    </Drawer>
  )
}

export default BootcampDrawer
