import MyDataGrid from './DataGrid'
import TemporaryDrawer from './Drawer'
import Box from '@mui/material/Box'
import Footer from 'components/layout/Footer'
import { boxStyles } from './BootcampPageComponentStyles'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

const BootcampComponent = () => {
  return (
    <>
      <AdminLayout>
        <AdminContainer title={'Bootcamp demo'}>
          <Box sx={boxStyles}>
            <MyDataGrid />
          </Box>
        </AdminContainer>
      </AdminLayout>
    </>
  )
}

export default BootcampComponent
