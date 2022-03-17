import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { drawerWidth } from './styles'
import { Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

interface Props {
  open: boolean
  handler: () => void
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
)

function BootcampAppbar({ open, handler }: Props) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleClosedUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar sx={{ background: 'white', paddingLeft: '0px' }} position="fixed" open={open}>
      <Toolbar sx={{ paddingLeft: '0px' }}>
        <Image width={140} height={40} src="/podkrepi-bg-logo-en.svg" />
        <IconButton
          title="Dashboard"
          color="primary"
          aria-label="open drawer"
          onClick={handler}
          edge="start"
          sx={{
            margin: '0px 20px',
          }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Admin panel
        </Typography>
        <Box sx={{ flexGrow: 0, marginLeft: 'auto', marginRight: '0' }}>
          <Tooltip title="Profile">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <AccountCircle fontSize="medium" />
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
            onClose={handleOpenUserMenu}>
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleClosedUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default BootcampAppbar
