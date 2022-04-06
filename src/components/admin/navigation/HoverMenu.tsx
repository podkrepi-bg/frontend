import { ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import * as React from 'react'
import CustomListItem from './CustomListItem'
import { useRouter } from 'next/router'

type Props = {
  menu: string
  submenu: submenu
  icon: React.ElementType
}
type submenu = {
  label: string
  icon: React.ElementType
  href: string
}[]
export default function HoverMenu({ menu, submenu, icon: Icon }: Props) {
  const router = useRouter()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <>
      <ListItemButton onClick={handleOpenUserMenu}>
        <ListItemIcon title={menu}>{<Icon />}</ListItemIcon>
        <ListItemText primary={menu} />
      </ListItemButton>
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
        {submenu.map(({ label, icon: Icon, href }, index) => (
          <MenuItem key={index} onClick={handleCloseUserMenu}>
            <CustomListItem
              key={label}
              selected={href !== '#' && router.asPath.includes(href)}
              icon={<Icon />}
              label={label}
              onClick={() => router.push(href)}
              sx={{ pl: 2 }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
