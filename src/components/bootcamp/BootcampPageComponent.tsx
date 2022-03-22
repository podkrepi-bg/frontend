import MenuAppBar from './AppBar'
import MyDataGrid from './DataGrid'
import TemporaryDrawer from './Drawer'
import Box from '@mui/material/Box'
import Footer from 'components/layout/Footer'
import { boxStyles } from './BootcampPageComponentStyles'

const BootcampComponent = () => {
  return (
    <>
      <MenuAppBar />
      <Box sx={boxStyles}>
        <TemporaryDrawer />
        <MyDataGrid />
      </Box>
      <Footer />
    </>
  )
}

export default BootcampComponent
