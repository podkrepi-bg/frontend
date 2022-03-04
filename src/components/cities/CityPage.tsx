import React from 'react'

import CityGrid from './CityGrid'
import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function CityPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'Градове'}>
        <CityGrid />
      </AdminContainer>
    </AdminLayout>
  )
}
