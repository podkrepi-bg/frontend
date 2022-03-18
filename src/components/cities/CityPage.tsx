import React from 'react'

import CityGrid from './grid/CityGrid'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'
import GridAppbar from './grid/GridAppbar'

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
