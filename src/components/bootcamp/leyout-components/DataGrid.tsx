import * as React from 'react'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { dateFormatter } from 'common/util/date'

const columns: GridColumns = [
  { field: 'id', headerName: 'ID', hide: true },
  {
    field: 'name',
    headerName: 'Name',
    valueGetter: (p) => `${p.row.person.firstName} ${p.row.person.lastName}`,
    flex: 2,
  },
  {
    field: 'email',
    headerName: 'Email',
    valueGetter: (p) => p.row.person.email,
    flex: 3,
  },
  {
    field: 'message',
    headerName: 'Message',
    flex: 3,
  },
  {
    field: 'createdAt',
    headerName: 'Date',
    valueFormatter: (d) => typeof d.value === 'string' && dateFormatter(d.value),
    minWidth: 300,
  },
  {
    field: 'action',
    headerName: 'Действие',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 2,
    // valueGetter: (p: GridValueGetterParams) => `${p.row.firstName || ''} ${p.row.lastName || ''}`,
  },
]

export default function BootcampGrid() {
  const data = undefined
  return (
    <DataGrid
      rows={data || []}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      autoHeight
      autoPageSize
      checkboxSelection
      disableSelectionOnClick
    />
  )
}
