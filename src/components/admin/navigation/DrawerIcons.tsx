import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
function DrawerIcons({ drawerOpen, handleDrawerOpen }: any) {
  return (
    <Box display="flex" alignItems={'center'}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(drawerOpen && { display: 'none' }) }}>
        <MenuIcon fontSize="large" color="action" />
      </IconButton>
      <img
        src="http://blog.podkrepi.bg/content/images/2021/09/podkrepi-bg-logo.svg"
        alt=""
        style={{ width: '170px', display: drawerOpen ? 'none' : '' }}
      />
    </Box>
  )
}

export default DrawerIcons
