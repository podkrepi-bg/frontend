import { Alert, Box, Fab, Typography } from '@mui/material'
import { DataGrid, GridColumns, GridRow } from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState } from 'react'
import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import Actions from './Actions'
import Link from 'next/link'
import { useCarsList } from '../../common/hooks/cars'

export default function CarsGrid() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteAllOpen, setDeleteAllOpen] = useState(false)
  const [details, setDetails] = useState({})
  const [deleteId, setDeleteId] = useState('')
  const [alertDisplay, setAlertDisplay] = useState('none')
  const [alertValue, setAlertValue] = useState('')
  const [selectionModel, setSelectionModel] = useState([])
  const { data } = useCarsList()
  const [cars, setCars] = useState(data)

  useEffect(() => {
    const alertMessage = sessionStorage.getItem('alert')

    if (alertMessage) {
      setAlertValue(alertMessage)
      setAlertDisplay('')
      setTimeout(() => {
        setAlertDisplay('none')
        sessionStorage.removeItem('alert')
      }, 3000)
    }
  })

  const columns: GridColumns = [
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
      width: 200,
      align: 'right',
      renderCell: (cellValues: any) => {
        return (
          <Actions
            cellValues={cellValues}
            setDetails={setDetails}
            setDeleteId={setDeleteId}
            setDeleteOpen={setDeleteOpen}
            setDetailsOpen={setDetailsOpen}
          />
        )
      },
    },
  ]

  function deleteAllHandler() {
    setDeleteAllOpen(true)
  }

  return (
    <>
      <Box sx={{ mt: 10, mx: 'auto', width: 600 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30 }}>Cars list</Typography>
          <Box>
            <Link href="/cars/create">
              <Fab sx={{ mr: 2 }}>
                <AddIcon />
              </Fab>
            </Link>
            <Fab onClick={deleteAllHandler}>
              <DeleteIcon />
            </Fab>
          </Box>
        </Box>
        <div style={{ display: 'flex', height: 400 }}>
          <DataGrid
            sortingOrder={['desc', 'asc']}
            rows={cars || []}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel: any) => {
              setSelectionModel(newSelectionModel)
            }}
            disableSelectionOnClick
          />
        </div>
      </Box>
      <DetailsModal detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} details={details} />
      <DeleteModal
        cars={cars}
        setCars={setCars}
        id={deleteId}
        open={deleteOpen}
        setOpen={setDeleteOpen}
      />
      <DeleteAllModal
        setAlertDisplay={setAlertDisplay}
        setAlertValue={setAlertValue}
        cars={cars}
        setCars={setCars}
        selectionModel={selectionModel}
        open={deleteAllOpen}
        setOpen={setDeleteAllOpen}
      />
      <Alert
        sx={{
          display: alertDisplay,
          width: '100%',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 80,
        }}
        severity="success">
        {alertValue}
      </Alert>
    </>
  )
}
