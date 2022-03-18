import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import DocumentGrid from './grid/DocumentGrid'

export default function MainPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Роля на документ за кампанията'}>
        <DocumentGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
