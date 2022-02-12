import { Menu, MenuItem, Avatar } from '@mui/material'

interface Props {
  handleClick: (event: React.MouseEvent<HTMLElement>) => void
  anchorEl: null | HTMLElement
  handleClose: () => void
  isOpen: boolean
}

function ProfileMenuItems({ handleClick, anchorEl, handleClose, isOpen }: Props) {
  return (
    <div>
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
