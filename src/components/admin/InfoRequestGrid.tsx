import React from 'react'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID', hidden: true },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 200,
    editable: true,
  },
]

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'john@example.com' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'john@example.com' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'john@example.com' },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'john@example.com' },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'john@example.com' },
  { id: 6, lastName: 'Melisandre', firstName: null, email: 'john@example.com' },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'john@example.com' },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'john@example.com' },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'john@example.com' },
]

export default function InfoRequestGrid() {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableSelectionOnClick
    />
  )
}
