import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Picture from '/public/podkrepi-bg-logo.svg'
import Image from 'next/image'
interface Props {
  drawerOpen: boolean
  handleDrawerOpen: () => void
}
function DrawerIcons({ drawerOpen, handleDrawerOpen }: Props) {
  const logoStyles = { display: drawerOpen ? 'none' : 'flex', alignItems: 'center' }
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
      <div style={logoStyles}>
        <Image src={Picture} alt="" width={170} height={51} />
      </div>
    </Box>
  )
}

export default DrawerIcons
