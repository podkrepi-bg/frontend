import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
import Image from 'next/image'
const DrawerHeaderComp = styled('div')(({ theme }: any) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))
function DrawerHeader({ handleDrawerClose }: any) {
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
        <Image
          src="data:image/png;base64,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"
          width={150}
          height={150}
        />
      </Box>
      <Box display="flex" alignItems="center" justifyContent="start" width="100%">
        <IconButton sx={{ padding: { xs: '10px', sm: 0 } }} onClick={handleDrawerClose}>
          <MenuIcon fontSize="medium" color="action" />
        </IconButton>
        <Box sx={{ display: { sm: 'flex', xs: 'none' } }}>
          <img
            src="http://blog.podkrepi.bg/content/images/2021/09/podkrepi-bg-logo.svg"
            alt=""
            style={{ width: '150px', marginLeft: '20px' }}
          />
        </Box>
      </Box>
    </DrawerHeaderComp>
  )
}

export default DrawerHeader
