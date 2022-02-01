import { Menu, MenuItem, Typography, Avatar } from '@mui/material'

function ProfileMenuItems({ handleClick, anchorEl, handleClose, isOpen }: any) {
  return (
    <div>
      <Typography
        sx={{
          color: '#7d7d7d',
          width: '100%',
          position: 'fixed',
          left: '0',
          right: '0',
          zIndex: -1,
        }}
        textAlign="center"
        variant="h4">
        Админ панел
      </Typography>
      <Avatar
        onClick={handleClick}
        sx={{
          display: { lg: 'flex', md: 'flex', sm: 'flex', xs: 'none' },
          cursor: 'pointer',
        }}
        src="/broken-image.jpg"
      />
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        <MenuItem
          onClick={() => {
            console.log('profile')
          }}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('account')
          }}>
          My account
        </MenuItem>
        <MenuItem
          onClick={() => {
            console.log('logout')
          }}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileMenuItems
