import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import PodkrepiBgLogo from './PodkrepibgLogo/PodkrepiBgLogo'
import Link from 'next/link'
import { useSession } from 'common/util/useSession'

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const { keycloak } = useSession()

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const isAuthenticated = keycloak?.authenticated

  const LoggedInUser = () => {
    return (
      <>
        <Link href="/profile">
          <a>
            <MenuItem onClick={handleClose}>Моят профил</MenuItem>
          </a>
        </Link>
        <Link href="/logout">
          <a>
            <MenuItem onClick={handleClose}>Изход</MenuItem>
          </a>
        </Link>
      </>
    )
  }

  const GuestUser = () => {
    return (
      <>
        <Link href="/login">
          <a>
            <MenuItem onClick={handleClose}>Вход</MenuItem>
          </a>
        </Link>
        <Link href="/register">
          <a>
            <MenuItem onClick={handleClose}>Регистрация</MenuItem>
          </a>
        </Link>
      </>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Link href="/">
            <a>
              <PodkrepiBgLogo />
            </a>
          </Link>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              {isAuthenticated ? <LoggedInUser /> : <GuestUser />}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
