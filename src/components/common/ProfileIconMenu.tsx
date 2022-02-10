import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, Tooltip } from '@mui/material'

export default function ProfileIconMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { t } = useTranslation()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: '4px', height: '32px' }}>
          <Avatar
            sx={{ width: '32px', height: '32px' }}
            alt="Remy Sharp"
            src="https://thumbs.dreamstime.com/b/happy-smiling-geek-hipster-beard-man-cool-avatar-geek-man-avatar-104871313.jpg"
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
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{t('nav.dashboard.profile-menu.profile')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{t('nav.dashboard.profile-menu.settings')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">{t('nav.dashboard.profile-menu.logout')}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}
