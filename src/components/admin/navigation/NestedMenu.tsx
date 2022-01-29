import { ListItem, ListItemIcon } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
export default function NestedMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <div onClick={handleClick}>
      <ListItem
        button
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'left' },
          padding: '10px',
        }}>
        <ListItemIcon sx={{ display: { xs: 'none', sm: 'block' } }}>
          <AccountBoxIcon />
        </ListItemIcon>
        <Button sx={{ display: { xs: 'none', sm: 'block' } }}>Профил</Button>
        <Button sx={{ display: { xs: 'block', sm: 'none' }, width: '96%' }} variant="outlined">
          Профил
        </Button>
      </ListItem>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  )
}
