import { Box } from '@mui/material'
import Footer from 'components/layout/Footer'
import MenuAppBar from '../AppBar'
import { boxStyles } from '../BootcampPageComponentStyles'
import TemporaryDrawer from '../Drawer'

const BootcampCreateComponent = () => {
  return (
    <>
      <MenuAppBar />
      <Box sx={boxStyles}>
        <TemporaryDrawer />
      </Box>
      <Footer />
    </>
  )
}

export default BootcampCreateComponent
