import Box from '@mui/material/Box'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import Footer from 'components/layout/Footer'
import MenuAppBar from '../AppBar'
import { boxStyles } from '../BootcampPageComponentStyles'
import TemporaryDrawer from '../Drawer'
import Form from './Form'

const BootcampCreateComponent = () => {
  return (
    <>
      <MenuAppBar />
      <AdminLayout>
        <AdminContainer title={'Bootcamp demo'}>
          <Box sx={boxStyles}>
            <Form />
          </Box>
        </AdminContainer>
      </AdminLayout>
      <Footer />
    </>
  )
}

export default BootcampCreateComponent
