import PictureLogo from '/public/android-chrome-192x192.png'
import { Box, IconButton, Theme } from '@mui/material'
import Picture from '/public/podkrepi-bg-logo.svg'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

const DrawerHeaderComp = styled('div')(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

interface Props {
  handleDrawerClose: () => void
}

function DrawerHeader({ handleDrawerClose }: Props) {
  return (
    <DrawerHeaderComp
      sx={{
        position: 'relative',
        justifyContent: 'space-between',
        padding: '10px',
        marginBottom: '10px',
      }}>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none', md: 'none' },
          position: 'absolute',
          width: '100%',
          justifyContent: 'center',
          marginTop: '100px',
        }}>
        <Image src={PictureLogo} width={150} height={150} />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="start" width="100%">
        <IconButton sx={{ padding: { xs: '10px', sm: 0 } }} onClick={handleDrawerClose}>
          <MenuIcon fontSize="medium" color="action" />
        </IconButton>
        <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>
          <div style={{ display: 'flex', marginLeft: '20px', cursor: 'pointer' }}>
            <Image src={Picture} alt="" width={150} height={51} />
          </div>
        </Box>
      </Box>
    </DrawerHeaderComp>
  )
}

export default DrawerHeader
