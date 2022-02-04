import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { observer } from 'mobx-react'
import { makeStyles } from '@mui/styles'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useState, MouseEvent } from 'react'

import PodkrepiLogo from 'components/brand/PodkrepiLogo'
import { DrawerStore } from 'stores/bootcamp-interns/DrawerStore'

import MyDrawer, { drawerWidth } from './MyDrawer'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const useStyles = makeStyles(() => {
  return {
    appbar: {
      width: '100%',
      background: '#f4f4f4',
    },
    shrinkedAppbar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: '#f4f4f4',
    },
  }
})

export default observer(function ResponsiveAppBar() {
  const classes = useStyles()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { isDrawerOpen, closeDrawer, openDrawer } = DrawerStore

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const changeHandler = () => {
    isDrawerOpen ? closeDrawer() : openDrawer()
  }

  console.log(isDrawerOpen)

  return (
    <AppBar
      elevation={2}
      className={isDrawerOpen ? `${classes.shrinkedAppbar}` : `${classes.appbar}`}>
      <Toolbar disableGutters>
        <MyDrawer />
        <IconButton onClick={changeHandler} sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <PodkrepiLogo variant="fixed" />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" component="h1">
            Admin Panel
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="Petar Dzhunov"
                src="https://scontent-sof1-1.xx.fbcdn.net/v/t1.6435-9/52945541_2493036137391235_2219405297733074944_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=174925&_nc_ohc=4-pxJOyTyrQAX8_ej13&tn=K55rxxwKg1iVRyW3&_nc_ht=scontent-sof1-1.xx&oh=00_AT86bqrdtIiIgqLHizEVD5Tp3NSyV1pLNbSD5yBPMnM5Mw&oe=6218B694"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
})
