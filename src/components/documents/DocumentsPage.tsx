import AdminLayout from './layout/AdminLayout'
import Grid from './grid/Grid'
import AdminContainer from './layout/AdminContainer'
import GridAppbar from './grid/GridAppbar'

export default function DocumentsPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Документи'}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
