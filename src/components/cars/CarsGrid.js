import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import CarsModal from './CarsModal'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'
import Link from 'next/link'
import fetch from 'node-fetch'
import DeleteModal from './DeleteModal'

export default function CarsGrid({ cars, setCars }) {
  const [open, setOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [deleteId, setDeleteId] = useState('')

  const columns = [
    {
      field: 'brand',
      headerName: 'Brand',
      width: 150,
    },
    {
      field: 'model',
      headerName: 'Model',
      width: 150,
    },
    {
      field: 'Actions',
      width: 150,
      renderCell: (cellValues) => {
        return (
          <>
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              onClick={(event) => {
                detailsClickHandler(event, cellValues)
              }}>
              <PageviewIcon />
            </IconButton>
            <Link href={`/cars/${cellValues.row.id}/edit`}>
              <IconButton size="small" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
            </Link>
            <IconButton
              size="small"
              onClick={(event) => {
                deleteClickHandler(event, cellValues)
              }}>
              <DeleteIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  const modalProps = {
    cars,
    setCars,
    open,
    setOpen,
    ...details,
  }

  function detailsClickHandler(e, cellValues) {
    setDetails({ ...cellValues.row })
    setOpen(true)
  }

  function deleteClickHandler(e, cellValues) {
    setDeleteId(cellValues.row.id)
    setDeleteOpen(true)
  }

  return (
    <>
      <Box sx={{ mt: 10, mx: 'auto', width: 600 }}>
        <div style={{ display: 'flex', height: 400 }}>
          <DataGrid
            sortingOrder={['desc', 'asc']}
            rows={cars}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
          />
        </div>
      </Box>
      <CarsModal props={modalProps} />
      <DeleteModal
        cars={cars}
        setCars={setCars}
        id={deleteId}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
    </>
  )
}
