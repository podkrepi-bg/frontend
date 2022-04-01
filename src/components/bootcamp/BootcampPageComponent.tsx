import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import GridAppbar from './grid/GridAppbar'
import Grid from './grid/Grid'

const BootcampComponent = () => {
  return (
    <>
      <AdminLayout>
        <AdminContainer title={'Bootcamp demo'}>
          <GridAppbar />
          <Grid />
        </AdminContainer>
      </AdminLayout>
    </>
  )
}

export default BootcampComponent
