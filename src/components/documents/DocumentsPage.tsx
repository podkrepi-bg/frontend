import Layout from './layout/Layout'
import Grid from './grid/Grid'
import AdminContainer from './layout/AdminContainer'
import GridAppbar from './grid/GridAppbar'

export default function DocumentsPage() {
  return (
    <Layout>
      <AdminContainer title={'Документи'}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </Layout>
  )
}
