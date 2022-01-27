import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import CarsModal from './CarsModal'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import fetch from 'node-fetch'

export default function CarsGrid({ cars, setCars }) {
  const [open, setOpen] = useState(false)
  const [editBrand, setEditBrand] = useState('')
  const [editModel, setEditModel] = useState('')
  const [editId, setEditId] = useState('')

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
              onClick={(event) => {
                editClickHandler(event, cellValues)
              }}
              sx={{ mr: 1 }}>
              <EditIcon />
            </IconButton>
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
    editId,
    editBrand,
    setEditBrand,
    editModel,
    setEditModel,
    cars,
    setCars,
    open,
    setOpen,
  }

  function deleteClickHandler(e, cellValues) {
    const carId = cellValues.row.id
    fetch(`http://localhost:5010/api/car/${carId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      setCars([...cars.filter((car) => car.id !== carId)])
    })
  }

  function editClickHandler(e, cellValues) {
    setOpen(true)
    setEditId(cellValues.row.id)
    setEditBrand(cellValues.row.brand)
    setEditModel(cellValues.row.model)
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
    </>
  )
}
