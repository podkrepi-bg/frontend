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

import { useDocumentsList } from 'common/hooks/documents'
import { routes } from 'common/routes'
import { DocumentResponse } from 'gql/document'

import DetailsModal from './DetailsModal'
import DeleteModal from './DeleteModal'
import DeleteAllModal from './DeleteAllModal'
import Actions from './Actions'
import { ModalStore } from 'stores/ModalStore'
import { observer } from 'mobx-react'

export default observer(function Grid() {
  const [selectedId, setSelectedId] = useState<string>('')
  const [selectionModel, setSelectionModel] = useState<GridRowId[]>([])

  const { showDeleteAll } = ModalStore

  const { data }: UseQueryResult<DocumentResponse[]> = useDocumentsList()

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
        return <Actions id={cellValues.row.id} setSelectedId={setSelectedId} />
      },
    },
  ]

  return (
    <>
      <Box sx={{ marginTop: '2%', mx: 'auto', width: 700 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30 }}>Documents list</Typography>
          <Box>
            <Link href={routes.documents.create}>
              <Fab sx={{ mr: 2 }}>
                <AddIcon />
              </Fab>
            </Link>
            <Fab onClick={showDeleteAll}>
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
      <DetailsModal id={selectedId} />
      <DeleteModal id={selectedId} />
      <DeleteAllModal selectionModel={selectionModel} />
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
})
