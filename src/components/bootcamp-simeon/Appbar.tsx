import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { useTranslation } from 'next-i18next'
import { drawerWidth } from './styles'
import { Box, IconButton, Toolbar, Typography } from '@mui/material'

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

export default function BootcampAppbar({ open, handler }: Props) {
  const { t } = useTranslation()
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

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
        <Box sx={{ flexGrow: 0, marginLeft: 'auto', marginRight: '0' }}></Box>
      </Toolbar>
    </AppBar>
  )
}
