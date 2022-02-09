import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { UseQueryResult } from 'react-query'
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

import DetailsModal from 'components/documents/grid/DetailsModal'
import DeleteModal from 'components/documents/grid/DeleteModal'
import DeleteAllModal from 'components/documents/grid/DeleteAllModal'
import Actions from 'components/documents/grid/Actions'
import { useDocumentsList } from 'common/hooks/documents'
import { DocumentType } from 'gql/document'
import { routes } from 'common/routes'

export default function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])

  const [detailsOpen, setDetailsOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [deleteAllOpen, setDeleteAllOpen] = useState<boolean>(false)

  const { data }: UseQueryResult<DocumentType[]> = useDocumentsList()

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
            id={cellValues.row.id}
            setSelectedId={setSelectedId}
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
            <Link href={routes.documents.create}>
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
            rows={data || []}
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
      <DetailsModal detailsOpen={detailsOpen} setDetailsOpen={setDetailsOpen} id={selectedId} />
      <DeleteModal id={selectedId} open={deleteOpen} setOpen={setDeleteOpen} />
      <DeleteAllModal
        idsToDelete={selectionModel}
        open={deleteAllOpen}
        setOpen={setDeleteAllOpen}
      />
      {/* <Alert
        sx={{
          display: 'none',
          width: '100%',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 80,
        }}
        severity="success">
        Value...
      </Alert> */}
    </>
  )
}
