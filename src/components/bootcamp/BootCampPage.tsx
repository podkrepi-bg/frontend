import React from 'react'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import GridAppbar from './grid/GridAppbar'
import BootcampGrid from './grid/BootcampGrid'

export default function CityPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Бууткамп - Георги Генчев'}>
        <GridAppbar />
        <BootcampGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
