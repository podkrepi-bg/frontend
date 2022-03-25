import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import { containerStyles } from './DataGridStyles'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { data } from '../CreatePageComponet/Form'

export default function MyDataGrid() {
  const rows: GridRowsProp = data

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'Име', width: 250 },
    { field: 'lastName', headerName: 'Фамилия', width: 250 },
    { field: 'city', headerName: 'Град', width: 250 },
  ]

  return (
    <Container sx={containerStyles}>
      <Link href="/bootcamp/create">
        <Button variant="contained">Create New</Button>
      </Link>
      <DataGrid rows={rows} columns={columns} autoHeight />
    </Container>
  )
}
