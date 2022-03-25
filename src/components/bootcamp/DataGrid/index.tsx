import React from 'react'
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid'
import Container from '@mui/material/Container'
import { containerStyles } from './DataGridStyles'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { data } from '../CreatePageComponet/Form'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import ConfirmationDialog from 'components/common/ConfirmationDialog'

export default function MyDataGrid() {
  const rows: GridRowsProp = data

  function deleteHandler(e: React.ClassicElement<HTMLInputElement>) {
    console.log(e.target as HTMLInputElement)
  }

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'firstName', headerName: 'Име', width: 250 },
    { field: 'lastName', headerName: 'Фамилия', width: 250 },
    { field: 'city', headerName: 'Град', width: 250 },
    {
      field: 'delete',
      headerName: 'Изтрий',
      width: 80,
      renderCell: () => <DeleteIcon onClick={deleteHandler} />,
    },
    {
      field: 'edit',
      headerName: 'Редактирай',
      width: 110,
      renderCell: () => <EditIcon onClick={deleteHandler} />,
    },
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
