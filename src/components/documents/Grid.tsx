import { Alert, Box, Fab, Typography } from '@mui/material'
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridRowId,
  GridSelectionModel,
} from '@mui/x-data-grid'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import DetailsModal from 'components/documents/DetailsModal'
import DeleteModal from 'components/documents/DeleteModal'
import DeleteAllModal from 'components/documents/DeleteAllModal'
import Actions from 'components/documents/Actions'
import { useDocumentsList } from 'common/hooks/documents'
import { UseQueryResult } from 'react-query'
import { DocumentType } from 'gql/document'

export default function CarsGrid() {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteAllOpen, setDeleteAllOpen] = useState(false)
  const [details, setDetails] = useState(null)
  const [deleteId, setDeleteId] = useState('')
  const [alertDisplay, setAlertDisplay] = useState('none')
  const [alertValue, setAlertValue] = useState('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])
  const { data }: UseQueryResult<DocumentType[]> = useDocumentsList()
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
      field: 'type',
      headerName: 'Type',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'filename',
      headerName: 'File Name',
      width: 150,
    },
    {
      field: 'Actions',
      width: 200,
      align: 'right',
      renderCell: (cellValues: GridRenderCellParams) => {
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
      <Box sx={{ mt: 10, mx: 'auto', width: 700 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30 }}>Documents list</Typography>
          <Box>
            <Link href="/documents/create">
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
            onSelectionModelChange={(newSelectionModel: GridSelectionModel) => {
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
