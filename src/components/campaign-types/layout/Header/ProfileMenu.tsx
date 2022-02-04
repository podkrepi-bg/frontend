import React, { SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/styles'

export default function ProfileMenu() {
  const theme = useTheme()

  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenUserMenu = () => {
    setAnchorElUser(true as unknown as SetStateAction<null>)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }} style={{ position: 'relative', right: '-1000px' }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px', color: theme.palette.primary.main }}
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
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ ':hover': { color: theme.palette.primary.main } }}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ ':hover': { color: theme.palette.primary.main } }}>
          <Typography textAlign="center">Account</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleCloseUserMenu}
          sx={{ ':hover': { color: theme.palette.primary.main } }}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
