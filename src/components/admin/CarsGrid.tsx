import React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { useCarsList } from 'common/hooks/useCarsList'
import { useRouter } from 'next/router'
import { routes } from 'common/routes'
import { useContext } from 'react'
import { ModalContext } from 'context/ModalContext'
const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'brand',
    headerName: 'Brand',
    width: 200,
  },
  {
    field: 'model',
    headerName: 'Model',
    width: 250,
  },
  {
    field: 'year',
    headerName: 'Year',
    width: 250,
  },
]

export default function CarsGrid() {
  const modal: any = useContext(ModalContext)
  const { data } = useCarsList()
  const router = useRouter()
  return (
    <DataGrid
      style={{ marginTop: '50px' }}
      rows={data || []}
      columns={columns}
      pageSize={5}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
      onRowClick={(car) => {
        const id = car.getValue(car.id, 'id')
        if (typeof id !== 'string') return
        router.push(routes.admin.cars.view(id))
        modal.openModal()
      }}
    />
  )
}
