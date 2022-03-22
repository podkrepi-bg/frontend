import React from 'react'

import Grid from './Grid'
import GridAppbar from './GridAppbar'

import AdminLayout from 'components/admin/navigation/AdminLayout'
import AdminContainer from 'components/admin/navigation/AdminContainer'

export default function BootcampNeliPage() {
  return (
    <AdminLayout>
      <AdminContainer title={'BootcampNeli'}>
        <GridAppbar />
        <Grid />
      </AdminContainer>
    </AdminLayout>
  )
}
