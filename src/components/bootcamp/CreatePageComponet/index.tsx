import { Box } from '@mui/material'
import Footer from 'components/layout/Footer'
import MenuAppBar from '../AppBar'
import { boxStyles } from '../BootcampPageComponentStyles'
import TemporaryDrawer from '../Drawer'
import Form from './Form'

const BootcampCreateComponent = () => {
  return (
    <>
      <MenuAppBar />
      <Box sx={boxStyles}>
        <TemporaryDrawer />
        <Form />
      </Box>
      <Footer />
    </>
  )
}

export default BootcampCreateComponent
