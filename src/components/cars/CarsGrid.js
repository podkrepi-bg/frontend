import { Box, IconButton, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import DetailsModal from './DetailsModal'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PageviewIcon from '@mui/icons-material/Pageview'
import Link from 'next/link'
import DeleteModal from './DeleteModal'
import fetch from 'node-fetch'

export default function CarsGrid({ cars, setCars }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [details, setDetails] = useState({})
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

  function detailsClickHandler(e, cellValues) {
    setDetails({ ...cellValues.row })
    setDetailsOpen(true)
  }

  function deleteClickHandler(e, cellValues) {
    setDeleteId(cellValues.row.id)
    setDeleteOpen(true)
  }

  return (
    <>
      <Box sx={{ mt: 10, mx: 'auto', width: 600 }}>
        <Typography sx={{ mb: 2, fontSize: 30 }}>Cars list</Typography>
        <div style={{ display: 'flex', height: 400 }}>
          <DataGrid
            sortingOrder={['desc', 'asc']}
            rows={cars}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            disableSelectionOnClick
          />
        </div>
      </Box>
      <DetailsModal detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} details={details} />
      <DeleteModal cars={cars} setCars={setCars} id={deleteId} open={deleteOpen} setOpen={setDeleteOpen} />
    </>
  )
}
