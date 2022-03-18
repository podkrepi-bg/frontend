import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import { ModalStoreImpl } from 'stores/dashboard/ModalStore'

import CityGrid from './grid/CityGrid'
import GridAppbar from './grid/GridAppbar'

export const ModalStore = new ModalStoreImpl()

export default function CityPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Градове'}>
        <GridAppbar />
        <CityGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
