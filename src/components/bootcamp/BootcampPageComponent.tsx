import MyDataGrid from './grid'
import TemporaryDrawer from './Drawer'
import Box from '@mui/material/Box'
import Footer from 'components/layout/Footer'
import { boxStyles } from './BootcampPageComponentStyles'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import GridAppbar from './grid/GridAppbar'

const BootcampComponent = () => {
  return (
    <>
      <AdminLayout>
        <AdminContainer title={'Bootcamp demo'}>
          <GridAppbar />
          <MyDataGrid />
        </AdminContainer>
      </AdminLayout>
    </>
  )
}

export default BootcampComponent
